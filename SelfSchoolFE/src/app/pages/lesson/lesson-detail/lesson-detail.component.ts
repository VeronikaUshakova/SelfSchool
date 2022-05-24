import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {ILessonService} from "../../../services/lesson.service";
import {Teacher} from "../../../classes/teacher";
import {ITeacherService} from "../../../services/teacher.service";
import {IMaterialService} from "../../../services/material.service";
import {Material} from "../../../classes/material";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idLesson: number = 0;

  public teachers: Teacher[] = [];
  public materials: Material[] = [];

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _lessonService: ILessonService,
    private _teacherService: ITeacherService,
    private _materialService: IMaterialService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._findTeachers();
    this._findMaterials();

    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idLesson = Number(data.get('idLesson'));
      if(this.idLesson) {
        this._findLessons();
      }
    })

    this.form = this._formBuilder.group({
      nameLesson: ['', Validators.required],
      teachers: ['', Validators.required],
      dateLesson: ['', Validators.required],
      timeLesson: ['', Validators.required],
      materials: [[], Validators.required],
    })
  }

  private _findLessons(): void {
    this._lessonService.findLesson(this.idLesson).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  private _findMaterials(): void {
    this._materialService.findMaterials().subscribe( data => {
      this.materials = data;
    });
  }

  private _findTeachers(): void {
    this._teacherService.findTeachers().subscribe(data => {
      this.teachers = data;
    })
  }

  public saveLesson() {
    let data = this.form.getRawValue();
    this.idLesson ? data.idLesson = this.idLesson : undefined;
    if(this.form.valid) {
      if (!this.idLesson) {
        this._lessonService.createLesson(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListLesson();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._lessonService.editLesson(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListLesson();
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

  public deleteLesson() {
    if (this.idLesson) {
      this._lessonService.deleteLesson(this.idLesson).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListLesson();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Lesson');
    }
  }

  public openListLesson() {
    this._route.navigate(['./pages/lesson/list']);
  }
}
