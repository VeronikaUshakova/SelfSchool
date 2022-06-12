import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IAdminService} from "../../../services/admin.service";
import {IToastrService} from "../../../services/toastr.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public idAdmin: number = 0;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _adminService: IAdminService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idAdmin = Number(data.get('idAdmin'));
      if(this.idAdmin) {
        this._findAdmin();
      }
    })

    this.form = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  private _findAdmin(): void {
    this._adminService.findAdmin(this.idAdmin).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  public saveAdmin() {
    let data = this.form.getRawValue();
    this.idAdmin ? data.idAdmin = this.idAdmin : undefined;
    if(this.form.valid) {
      if (!this.idAdmin) {
        this._adminService.createAdmin(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListAdmin();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._adminService.editAdmin(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListAdmin();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      }
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  public deleteAdmin() {
    if (this.idAdmin) {
      this._adminService.deleteAdmin(this.idAdmin).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListAdmin();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Admin');
    }
  }

  public openListAdmin() {
    this._route.navigate(['./pages/admin/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
