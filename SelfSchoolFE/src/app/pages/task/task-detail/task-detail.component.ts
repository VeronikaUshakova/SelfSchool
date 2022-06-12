import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {ITaskLessonService} from "../../../services/task-lesson.service";
import {ILessonService} from "../../../services/lesson.service";
import {IMaterialService} from "../../../services/material.service";
import {Lesson} from "../../../classes/lesson";
import {Material} from "../../../classes/material";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idTask: number = 0;

  public lessons: Lesson[] = [];
  public materials: Material[] = [];

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _lessonService: ILessonService,
    private _materialService: IMaterialService,
    private _taskLessonService: ITaskLessonService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._findLessons();
    this._findMaterials();

    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idTask = Number(data.get('idTask'));
      if(this.idTask) {
        this._taskLessonService.findTaskLesson(this.idTask).subscribe(data => {
          this._findTaskLesson();
        })
      }
    })

    this.form = this._formBuilder.group({
      nameTask: ['', Validators.required],
      descriptionTask: ['', Validators.required],
      dateTask: ['', Validators.required],
      timeTask: ['', Validators.required],
      lessons: ['', Validators.required],
      materials: null,
    })
  }

  private _findTaskLesson(): void {
    this._taskLessonService.findTaskLesson(this.idTask).subscribe( data => {
      let task = data as any;
      task.dateTask = new Date(task.dateTask);
      task.timeTask = new Date(0,0,0, new Date(data.dateTask).getHours(),
        new Date(data.dateTask).getMinutes());
      task.lessons = task.idLesson;
      task.materials = task.idMaterial;
      this.form.patchValue(task);
    });
  }

  private _findLessons() {
    this._lessonService.findLessons().subscribe(data => {
      this.lessons = data;
    });
  }

  private _findMaterials() {
    this._materialService.findMaterials().subscribe(data => {
      this.materials = data;
    });
  }

  public saveTask() {
    let data = this.form.getRawValue();
    this.idTask ? data.idTask = this.idTask : undefined;
    if(this.form.valid) {
      data.dateTask = +new Date(data.dateTask.getFullYear(), data.dateTask.getMonth(), data.dateTask.getDate(),
        data.timeTask.getHours(), data.timeTask.getMinutes());
      delete data.timeTask;
      data.idLesson = data.lessons;
      delete data.lessons;
      data.idMaterial = data.materials;
      delete data.materials;
      if (!this.idTask) {
        this._taskLessonService.createTaskLesson(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListTask();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._taskLessonService.editTaskLesson(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListTask();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      }
    }else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  public deleteTask() {
    if (this.idTask) {
      this._taskLessonService.deleteTaskLesson(this.idTask).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListTask();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Task');
    }
  }

  public openListTask() {
    this._route.navigate(['./pages/task/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
