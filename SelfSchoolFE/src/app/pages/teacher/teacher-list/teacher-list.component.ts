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
import {Teacher} from "../../../classes/teacher";
import {ITeacherService} from "../../../services/teacher.service";
import {Teacher_ext} from "../../../classes/extended/teacher_ext";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  public teachers: Teacher[] = [];
  public customColumn = 'idTeacher';
  public defaultColumns = ['loginTeacher', 'passwordTeacher', 'nameTeacher', 'surnameTeacher',
    'birthdayTeacher', 'emailTeacher', 'phoneTeacher', 'subjectTeacher'];

  public dataSource: NbTreeGridDataSource<Teacher> = new NbTreeGridDataSource<Teacher>(new NbTreeGridSortService<Teacher>(),
    new NbTreeGridFilterService<Teacher>(), new NbTreeGridService<Teacher>(), new NbTreeGridDataService<Teacher>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Teacher>,
    private _teacherService: ITeacherService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._teacherService.findTeachers().subscribe(data => {
      this.teachers = data;
      let teachersModification: any[] = [];
      this.teachers.forEach(teacher => {
        let t = new Teacher_ext(teacher.idTeacher, teacher.loginTeacher, teacher.passwordTeacher,teacher.nameTeacher,
          teacher.surnameTeacher, new Date(teacher.birthdayTeacher).toDateString(), teacher.emailTeacher, teacher.phoneTeacher,
          teacher.subjectTeacher);
        teachersModification.push({ data: t });
      })
      this.dataSource = this.dataSourceBuilder.create(teachersModification);
    });
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

  public openNewTeacher() {
    this._route.navigate(['./pages/teacher/detail']);
  }

  public openEditTeacher(id: number) {
    this._route.navigate(['./pages/teacher/detail'], {queryParams: {'idTeacher': id}});
  }

  public exportExcel() {
    let element = document.getElementById('teacher-table');
    if(element) {
      this._excelService.exportExcel(element, 'Teachers');
    } else {
      this._toastrService.showToastr('warning','Teachers are not on the table.')
    }
  }
}
