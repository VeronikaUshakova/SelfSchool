import { Component, OnInit } from '@angular/core';
import {
  NbSortDirection, NbSortRequest,
  NbTreeGridDataService,
  NbTreeGridDataSource, NbTreeGridDataSourceBuilder,
  NbTreeGridFilterService,
  NbTreeGridService,
  NbTreeGridSortService
} from "@nebular/theme";
import {Router} from "@angular/router";
import {ILessonService} from "../../../services/lesson.service";
import {Lesson} from "../../../classes/lesson";
import {Lesson_ext} from "../../../classes/extended/lesson_ext";
import {ITeacherService} from "../../../services/teacher.service";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";
import {IUserService} from "../../../services/user.service";
import {take} from "rxjs";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  public lessons: Lesson[] = [];
  public customColumn = 'idLesson';
  public defaultColumns = ['nameLesson', 'teachers', 'dateLesson'];

  public dataSource: NbTreeGridDataSource<Lesson> = new NbTreeGridDataSource<Lesson>(new NbTreeGridSortService<Lesson>(),
    new NbTreeGridFilterService<Lesson>(), new NbTreeGridService<Lesson>(), new NbTreeGridDataService<Lesson>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Lesson>,
    private _lessonService: ILessonService,
    private _teacherService: ITeacherService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
    private _userService: IUserService,
  ) {}

  ngOnInit(): void {
    this._userService.getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this._userService.getUserID()
          .pipe(take(1))
          .subscribe((id) => {
            this._lessonService.findLessons().subscribe(lessons => {
              let lessonModification: any[] = [];
              lessons.forEach(lesson => {
                if(lesson.idTeacher === id && role === 'teacher') {
                  let data = lesson as any;
                  this._teacherService.findTeacher(data.idTeacher).subscribe(data => {
                    let l = new Lesson_ext(lesson.idLesson, lesson.nameLesson,
                      data.nameTeacher + ' ' + data.surnameTeacher,
                      new Date(lesson.dateLesson).toDateString());
                    lessonModification.push({data: l});
                    this.lessons.push(lesson);
                    this.dataSource = this.dataSourceBuilder.create(lessonModification);
                  })
                } else if(role !== 'teacher') {
                  let data = lesson as any;
                  this._teacherService.findTeacher(data.idTeacher).subscribe(data => {
                    let l = new Lesson_ext(lesson.idLesson, lesson.nameLesson,
                      data.nameTeacher + ' ' + data.surnameTeacher,
                      new Date(lesson.dateLesson).toDateString());
                    lessonModification.push({data: l});
                    this.lessons.push(lesson);
                    this.dataSource = this.dataSourceBuilder.create(lessonModification);
                  })
                }
              })
            });
          })
      })
  }

  public updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  public getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  public getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  public openNewLesson() {
    this._route.navigate(['./pages/lesson/detail']);
  }

  public openEditLesson(id: number) {
    this._route.navigate(['./pages/lesson/detail'], {queryParams: {'idLesson': id}});
  }

  public exportExcel() {
    let element = document.getElementById('lesson-table');
    if(element) {
      this._excelService.exportExcel(element, 'Lessons');
    } else {
      this._toastrService.showToastr('warning','Lessons are not on the table.')
    }
  }
}
