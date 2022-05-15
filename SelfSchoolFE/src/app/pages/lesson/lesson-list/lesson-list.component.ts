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

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  public lessons: Lesson[] = [];
  public customColumn = 'idLesson';
  public defaultColumns = ['nameLesson', 'teachers', 'dateLesson', 'materials'];

  public dataSource: NbTreeGridDataSource<Lesson> = new NbTreeGridDataSource<Lesson>(new NbTreeGridSortService<Lesson>(),
    new NbTreeGridFilterService<Lesson>(), new NbTreeGridService<Lesson>(), new NbTreeGridDataService<Lesson>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Lesson>,
    private _lessonService: ILessonService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._lessonService.findLessons().subscribe(data => {
      this.lessons = data;
      this.dataSource = this.dataSourceBuilder.create(this.lessons);
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

  public openNewLesson() {
    this._route.navigate(['./pages/lesson/detail']);
  }

}
