import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {ITeacherService} from "../../../services/teacher.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idTeacher: number = 0;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _teacherService: ITeacherService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idTeacher = Number(data.get('idTeacher'));
      if(this.idTeacher) {
        this._findTeacher();
      }
    })

    this.form = this._formBuilder.group({
      loginTeacher: ['', Validators.required],
      passwordTeacher: ['', Validators.required],
      nameTeacher: ['', Validators.required],
      surnameTeacher: ['', Validators.required],
      emailTeacher: ['', Validators.required],
      phoneTeacher: ['', Validators.required],
      birthdayTeacher: ['', Validators.required],
      subjectTeacher: ['', Validators.required],
    })
  }

  private _findTeacher(): void {
    this._teacherService.findTeacher(this.idTeacher).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  public saveTeacher() {
    let data = this.form.getRawValue();
    this.idTeacher ? data.idTeacher = this.idTeacher : undefined;
    if(this.form.valid) {
      data.birthdayTeacher = +new Date(data.birthdayTeacher);
      if (!this.idTeacher) {
        this._teacherService.createTeacher(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListTeacher();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._teacherService.editTeacher(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListTeacher();
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

  public deleteTeacher() {
    if (this.idTeacher) {
      this._teacherService.deleteTeacher(this.idTeacher).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListTeacher();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Teacher');
    }
  }

  public openListTeacher() {
    this._route.navigate(['./pages/teacher/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
