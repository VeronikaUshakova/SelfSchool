import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {IUserService} from "../services/user.service";
import {IToastrService} from "../services/toastr.service";
import {take} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _route: Router,
    private _loginService: ILoginService,
    private _userService: IUserService,
    private _toastrService: IToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public login() {
    let data = this.form.getRawValue();
    this._loginService.login(data)
      .pipe(take(1))
      .subscribe((data) => {
        if(data) {
          if (data.idPupil) {
            this._userService.setUserRole('pupil');
            this._userService.setUserID(data.idPupil);
          } else if (data.idAdmin) {
            this._userService.setUserRole('admin');
            this._userService.setUserID(data.idAdmin);
          } else if (data.idParent) {
            this._userService.setUserRole('parent');
            this._userService.setUserID(data.idParent);
          } else if (data.idTeacher) {
            this._userService.setUserRole('teacher');
            this._userService.setUserID(data.idTeacher);
          }
          this.openPages();
        } else {
          this._toastrService.showToastr('warning', 'Login or password is incorrect.')
        }
      });
  }

  public openPages() {
    this._route.navigate(['./pages']);
  }

  public openRegistration() {
    this._route.navigate(['./registration']);
  }

  public useLanguage(language: string): void {
    this.translate.use(language);
  }
}
