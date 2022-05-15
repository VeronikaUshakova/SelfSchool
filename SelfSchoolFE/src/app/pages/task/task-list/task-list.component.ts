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
import {TaskLesson} from "../../../classes/task-lesson";
import {ITaskLessonService} from "../../../services/task-lesson.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: TaskLesson[] = [];
  public customColumn = 'idTask';
  public defaultColumns = ['lesson', 'nameTask', 'descriptionTask', 'dateTask', 'materials'];

  public dataSource: NbTreeGridDataSource<TaskLesson> = new NbTreeGridDataSource<TaskLesson>(new NbTreeGridSortService<TaskLesson>(),
    new NbTreeGridFilterService<TaskLesson>(), new NbTreeGridService<TaskLesson>(), new NbTreeGridDataService<TaskLesson>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<TaskLesson>,
    private _taskLessonService: ITaskLessonService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._taskLessonService.findTaskLessons().subscribe(data => {
      this.tasks = data;
      this.dataSource = this.dataSourceBuilder.create(this.tasks);
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

  public openNewTaskLesson() {
    this._route.navigate(['./pages/task/detail']);
  }
}
