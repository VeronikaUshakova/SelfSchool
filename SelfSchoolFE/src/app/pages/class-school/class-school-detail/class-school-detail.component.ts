import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {IClassSchoolService} from "../../../services/class-school.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-class-school-detail',
  templateUrl: './class-school-detail.component.html',
  styleUrls: ['./class-school-detail.component.scss']
})
export class ClassSchoolDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idClass: number = 0;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _classSchoolService: IClassSchoolService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idClass = Number(data.get('idClass'));
      if(this.idClass) {
        this._findClassSchool();
      }
    })

    this.form = this._formBuilder.group({
      numberClass: ['', Validators.required],
      letterClass: ['', Validators.required],
    })
  }

  private _findClassSchool(): void {
    this._classSchoolService.findClassSchool(this.idClass).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  public saveClassSchool() {
    let data = this.form.getRawValue();
    this.idClass ? data.idClass = this.idClass : undefined;
    if(this.form.valid) {
      if (!this.idClass) {
        this._classSchoolService.createClassSchool(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListClassSchool();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._classSchoolService.editClassSchool(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListClassSchool();
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

  public deleteClassSchool() {
    if (this.idClass) {
      this._classSchoolService.deleteClassSchool(this.idClass).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListClassSchool();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Class');
    }
  }

  public openListClassSchool() {
    this._route.navigate(['./pages/class/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
