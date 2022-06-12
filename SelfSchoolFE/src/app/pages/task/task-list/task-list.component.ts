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
import {ILessonService} from "../../../services/lesson.service";
import {IMaterialService} from "../../../services/material.service";
import {TaskLesson_ext} from "../../../classes/extended/task-lesson_ext";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public tasks: TaskLesson[] = [];
  public customColumn = 'idTask';
  public defaultColumns = ['lessons', 'nameTask', 'descriptionTask', 'dateTask', 'materials'];

  public dataSource: NbTreeGridDataSource<TaskLesson> = new NbTreeGridDataSource<TaskLesson>(new NbTreeGridSortService<TaskLesson>(),
    new NbTreeGridFilterService<TaskLesson>(), new NbTreeGridService<TaskLesson>(), new NbTreeGridDataService<TaskLesson>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<TaskLesson>,
    private _taskLessonService: ITaskLessonService,
    private _lessonService: ILessonService,
    private _materialService: IMaterialService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._taskLessonService.findTaskLessons().subscribe(data => {
      this.tasks = data;
      let taskModification: any[] = [];
      this.tasks.forEach(task => {
        let data = task as any;
        this._lessonService.findLesson(data.idLesson).subscribe(dataL => {
          this._materialService.findMaterial(data.idMaterial).subscribe(dataM => {
            let t = new TaskLesson_ext(task.idTask, dataL.nameLesson,
              task.nameTask, task.descriptionTask,
              new Date(task.dateTask).toDateString(),
              dataM.urlMaterial ? (dataM.fileMaterial ? dataM.urlMaterial + ' '
                + dataM.fileMaterial : dataM.urlMaterial) : '');
            taskModification.push({data: t});
            this.dataSource = this.dataSourceBuilder.create(taskModification);
          });
        })
      })
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

  public openEditTaskLesson(id: number) {
    this._route.navigate(['./pages/task/detail'], {queryParams: {'idTask': id}});
  }

  public exportExcel() {
    let element = document.getElementById('task-table');
    if(element) {
      this._excelService.exportExcel(element, 'Tasks');
    } else {
      this._toastrService.showToastr('warning','Tasks are not on the table.')
    }
  }
}
