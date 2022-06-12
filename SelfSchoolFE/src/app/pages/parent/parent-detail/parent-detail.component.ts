import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {IParentService} from "../../../services/parent.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-parent-detail',
  templateUrl: './parent-detail.component.html',
  styleUrls: ['./parent-detail.component.scss']
})
export class ParentDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public idParent: number = 0;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _parentService: IParentService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idParent = Number(data.get('idParent'));
      if(this.idParent) {
        this._findParent();
      }
    })

    this.form = this._formBuilder.group({
      loginParent: ['', Validators.required],
      passwordParent: ['', Validators.required],
      nameParent: ['', Validators.required],
      surnameParent: ['', Validators.required],
      emailParent: ['', Validators.required],
      phoneParent: ['', Validators.required],
      birthdayParent: ['', Validators.required],
    })
  }

  private _findParent(): void {
    this._parentService.findParent(this.idParent).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  public saveParent() {
    let data = this.form.getRawValue();
    this.idParent ? data.idParent = this.idParent : undefined;
    if(this.form.valid) {
      data.birthdayParent = +new Date(data.birthdayParent);
      if (!this.idParent) {
        this._parentService.createParent(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListParent();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._parentService.editParent(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListParent();
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

  public deleteParent() {
    if (this.idParent) {
      this._parentService.deleteParent(this.idParent).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListParent();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Parent');
    }
  }

  public openListParent() {
    this._route.navigate(['./pages/parent/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
