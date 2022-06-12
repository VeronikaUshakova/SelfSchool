import { Component, OnInit } from '@angular/core';
import {Lesson} from "../../../classes/lesson";
import {ILessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {ITaskLessonService} from "../../../services/task-lesson.service";
import {TaskLesson} from "../../../classes/task-lesson";
import {IAnswerService} from "../../../services/answer.service";
import {URL_API} from "../../../shared/constants";
import {Material} from "../../../classes/material";
import {IMaterialService} from "../../../services/material.service";
import {TaskLesson_ext} from "../../../classes/extended/task-lesson_ext";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  public idLesson: number = 0;

  public lesson: Lesson = new Lesson(0, '', 0, 0);
  public tasks: TaskLesson_ext[] = [];
  public filterTasks: TaskLesson_ext[] = [];

  public material: Material = new Material(0, '', '');

  constructor(
    private _taskLessonService: ITaskLessonService,
    private _lessonService: ILessonService,
    private _answerService: IAnswerService,
    private _activatedRoute: ActivatedRoute,
    private _materialService: IMaterialService,
    private _route: Router,
  ) {
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idLesson = Number(data.get('idLesson'));
      this._lessonService.findLesson(this.idLesson)
        .pipe(take(1))
        .subscribe((lesson) => {
          this.lesson = lesson;
          this._findTasks();
        })
    })
  }

  private _findTasks() {
    this._taskLessonService.findTaskLessons()
      .pipe(take(1))
      .subscribe((tasks) => {
        tasks.forEach((task) => {
          this._materialService.findMaterial(task.idMaterial).subscribe((material) => {
            this.tasks.push(new TaskLesson_ext(task.idTask, task.idLesson.toString(), task.nameTask,
              task.descriptionTask, task.dateTask.toString(), material.fileMaterial || ''));
            this.tasks = this.tasks.filter(task => +task.lessons === this.idLesson)
            this.filterTasks = this.tasks;
          })
        })
      })
  }

  public findTask($event: any) {
    if ($event.data) {
      this.filterTasks = this.tasks.filter((task) =>
        task.nameTask.includes($event.data) || task.descriptionTask.includes($event.data)
      )
    } else {
      this.filterTasks = this.tasks;
    }
  }

  public openAnswer(idTask: number) {
    this._answerService.findAnswers()
      .pipe(take(1))
      .subscribe(data => {
        if(data.length) {
          data.forEach(answer => {
            if (answer.idTask === idTask) {
              this._route.navigate(['./pages/answer/detail'],
                {queryParams: {'idAnswer': answer.idAnswer, 'idTask': idTask}}
              );
            }
          })
          this._route.navigate(['./pages/answer/detail'],
            {queryParams: {'idTask': idTask}});
        } else {
          this._route.navigate(['./pages/answer/detail'],
            {queryParams: {'idTask': idTask}});
        }
      });
  }

  public fileLink(fileLink: string): string{
    return URL_API + fileLink;
  }
}
