import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {IPupilService} from "../../../services/pupil.service";
import {IClassSchoolService} from "../../../services/class-school.service";
import {ClassSchool} from "../../../classes/class-school";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-pupil-detail',
  templateUrl: './pupil-detail.component.html',
  styleUrls: ['./pupil-detail.component.scss']
})
export class PupilDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public idPupil: number = 0;

  public classes: ClassSchool[] = [];

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _pupilService: IPupilService,
    private _classSchoolService: IClassSchoolService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._findClasses();

    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idPupil = Number(data.get('idPupil'));
      if(this.idPupil) {
        this._findPupil();
      }
    })

    this.form = this._formBuilder.group({
      loginPupil: ['', Validators.required],
      passwordPupil: ['', Validators.required],
      namePupil: ['', Validators.required],
      surnamePupil: ['', Validators.required],
      emailPupil: ['', Validators.required],
      phonePupil: ['', Validators.required],
      birthdayPupil: ['', Validators.required],
      classes: ['', Validators.required]
    })
  }

  private _findClasses() {
    this._classSchoolService.findClassSchools().subscribe(data => {
      this.classes = data;
    })
  }

  private _findPupil(): void {
    this._pupilService.findPupil(this.idPupil).subscribe( data => {
      let pupil = data as any;
      pupil.classes = pupil.idClass;
      delete pupil.idClass;
      this.form.patchValue(pupil);
    });
  }

  public savePupil() {
    let data = this.form.getRawValue();
    this.idPupil ? data.idPupil = this.idPupil : undefined;
    if(this.form.valid) {
      data.birthdayPupil = +new Date(data.birthdayPupil);
      data.idClass = data.classes;
      delete data.classes;
      if (!this.idPupil) {
        this._pupilService.createPupil(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListPupil();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._pupilService.editPupil(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListPupil();
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

  public deletePupil() {
    if (this.idPupil) {
      this._pupilService.deletePupil(this.idPupil).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListPupil();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Pupil');
    }
  }

  public openListPupil() {
    this._route.navigate(['./pages/pupil/list']);
  }

  public cancel() {
    history.back();
  }

  public openGrade(id: number) {
    this._route.navigate(['./pages/grade'], {queryParams: {'idPupil': id}});
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
