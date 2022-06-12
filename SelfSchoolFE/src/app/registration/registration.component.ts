import { Component, OnInit } from '@angular/core';
import {RoleEnum} from "../shared/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IClassSchoolService} from "../services/class-school.service";
import {ClassSchool} from "../classes/class-school";
import {Router} from "@angular/router";
import {IToastrService, ToastrService} from "../services/toastr.service";
import {ITeacherService} from "../services/teacher.service";
import {IPupilService} from "../services/pupil.service";
import {IParentService} from "../services/parent.service";
import {IAdminService} from "../services/admin.service";
import {Admin} from "../classes/admin";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public role: RoleEnum = 'admin';
  public form: FormGroup = new FormGroup({});

  public classes: ClassSchool[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _route: Router,
    private _classSchoolService: IClassSchoolService,
    private _toastrService: IToastrService,
    private _teacherService: ITeacherService,
    private _pupilService: IPupilService,
    private _parentService: IParentService,
    private _adminService: IAdminService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._findClasses();

    this.form = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      idClass: ['', Validators.required],
      subjectTeacher: ['', Validators.required],
    })
  }

  private _findClasses() {
    this._classSchoolService.findClassSchools().subscribe(data => {
      this.classes = data;
    })
  }

  public roleChange($event: RoleEnum) {
    this.role = $event;
  }

  public openLogin() {
    this._route.navigate(['./login']);
  }

  public saveChanges()
  {
    let data = this.form.getRawValue();
    if(this.role === 'admin') {
      this._saveAdmin(data);
    } else if(this.role === 'pupil') {
      this._savePupil(data);
    } else if(this.role === 'parent') {
      this._saveParent(data);
    } else if(this.role === 'teacher') {
      this._saveTeacher(data);
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  private _saveAdmin(data: any) {
    if(data.login && data.password) {
      let admin = {
        login: data.login,
        password: data.password
      };
      this._adminService.createAdmin(admin as Admin).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openLogin();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        });
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  private _savePupil(data: any) {
    if(data.login && data.password && data.name && data.surname &&
      data.birthday && data.email && data.phone && data.idClass) {
      let pupil = {
        loginPupil: data.login,
        passwordPupil: data.password,
        namePupil: data.name,
        surnamePupil: data.surname,
        birthdayPupil: +data.birthday,
        emailPupil: data.email,
        phonePupil: data.phone,
        idClass: data.idClass
      };
      this._pupilService.createPupil(pupil).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openLogin();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        });
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  private _saveParent(data: any) {
    if(data.login && data.password && data.name && data.surname &&
      data.birthday && data.email && data.phone) {
      let parent = {
        loginParent: data.login,
        passwordParent: data.password,
        nameParent: data.name,
        surnameParent: data.surname,
        birthdayParent: +data.birthday,
        emailParent: data.email,
        phoneParent: data.phone,
      };
      this._parentService.createParent(parent).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openLogin();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        });
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  private _saveTeacher(data: any) {
    if (data.login && data.password && data.name && data.surname &&
      data.birthday && data.email && data.phone && data.subjectTeacher) {
      let teacher = {
        loginTeacher: data.login,
        passwordTeacher: data.password,
        nameTeacher: data.name,
        surnameTeacher: data.surname,
        birthdayTeacher: +data.birthday,
        emailTeacher: data.email,
        phoneTeacher: data.phone,
        subjectTeacher: data.subjectTeacher,
      };
      this._teacherService.createTeacher(teacher).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openLogin();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        });
    } else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  public cancel() {
    history.back();
  }

  public useLanguage(language: string): void {
    this.translate.use(language);
  }
}
