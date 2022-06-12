import { Component, OnInit } from '@angular/core';
import {IUserService} from "../../services/user.service";
import {ITeacherService} from "../../services/teacher.service";
import {IPupilService} from "../../services/pupil.service";
import {IParentService} from "../../services/parent.service";
import {IAdminService} from "../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClassSchool} from "../../classes/class-school";
import {IClassSchoolService} from "../../services/class-school.service";
import {IToastrService} from "../../services/toastr.service";
import {URL_API} from "../../shared/constants";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {IMaterialService} from "../../services/material.service";
import {Parent} from "../../classes/parent";
import {Pupil} from "../../classes/pupil";
import {Family} from "../../classes/family";
import {IFamilyService} from "../../services/family.service";
import {finalize, take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.scss']
})
export class PersonalCabinetComponent implements OnInit {

  public classes: ClassSchool[] = [];
  public pupils: Pupil[] = [];
  public parents: Parent[] = [];
  public family: Family = new Family(0, [], []);

  public role: any;
  public user: any;

  public buttonShow: boolean = false;

  public message: string = '';
  public progress: number = 0;
  public file: string = '';

  public formAdmin: FormGroup = new FormGroup({});
  public formPupil: FormGroup = new FormGroup({});
  public formParent: FormGroup = new FormGroup({});
  public formTeacher: FormGroup = new FormGroup({});
  public formFamily: FormGroup = new FormGroup({});
  public formCreateBackUp: FormGroup = new FormGroup({});
  public formApplyBackUp: FormGroup = new FormGroup({});

  constructor(
    private _userService: IUserService,
    private _teacherService: ITeacherService,
    private _pupilService: IPupilService,
    private _parentService: IParentService,
    private _familyService: IFamilyService,
    private _adminService: IAdminService,
    private _classSchoolService: IClassSchoolService,
    private _formBuilder: FormBuilder,
    private _toastrService: IToastrService,
    private _materialService: IMaterialService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this._userService.getUserRole().subscribe((role) => {
      this.role = role;
      this._userService.getUserID().subscribe((id) => {
        if (id > 0) {
          if (role === 'admin') {
            this._generateAdminForm(id);
          } else if (role === 'pupil') {
            this._generatePupilForm(id);
          } else if (role === 'parent') {
            this._generateParentForm(id);
          } else if (role === 'teacher') {
            this._generateTeacherForm(id);
          }
        }
      })
    })
  }

  private _findFamily(): void {
    this._familyService.findFamilies()
      .pipe(take(1),
        finalize(() => {
          this.formFamily.patchValue(this.family);
          this.formFamily.disable();
        }))
      .subscribe( data => {
      data.forEach(family => {
        if(this.role === 'pupil') {
          family.pupils.forEach(f => {
            if(f === this.user?.idPupil){
              this.family = family;
            }
          })
        } else if(this.role === 'parent') {
          family.parents.forEach(f => {
            if(f === this.user?.idParent){
              this.family = family;
            }
          })
        }
      })
    });
  }

  private _findParents(): void {
    this._parentService.findParents().subscribe( data => {
      this.parents = data;
    });
  }

  private _findPupils(): void {
    this._pupilService.findPupils().subscribe( data => {
      this.pupils = data;
    });
  }

  private _findClasses() {
    this._classSchoolService.findClassSchools().subscribe((classes) => {
      this.classes = classes;
    })
  }

  private _generateAdminForm(id: number) {
    this._adminService.findAdmin(id).subscribe((admin) => {
      this.user = admin;
      this.formAdmin.patchValue(this.user);
    });
    this.formAdmin = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formCreateBackUp = this._formBuilder.group({
      fileName: ['', Validators.required],
    });
    this.formApplyBackUp = this._formBuilder.group({
      fileBackUp: ['', Validators.required],
    });
    this.formAdmin.disable();
  }

  private _generatePupilForm(id: number) {
    this._findClasses();
    this._findPupils();
    this._findParents();
    this._pupilService.findPupil(id).subscribe((pupil) => {
      this.user = pupil;
      this.user.classes = this.user.idClass;
      this._findFamily();
      this.formPupil.patchValue(this.user);
    });
    this.formPupil = this._formBuilder.group({
      loginPupil: ['', Validators.required],
      passwordPupil: ['', Validators.required],
      namePupil: ['', Validators.required],
      surnamePupil: ['', Validators.required],
      emailPupil: ['', Validators.required],
      phonePupil: ['', Validators.required],
      birthdayPupil: ['', Validators.required],
      classes: ['', Validators.required]
    });

    this.formFamily = this._formBuilder.group({
      pupils: [[], Validators.required],
      parents: [[], Validators.required],
    })
    this.formPupil.disable();
    this.formParent.disable();
  }

  private _generateParentForm(id: number) {
    this._findPupils();
    this._findParents();

    this._parentService.findParent(id).subscribe((parent) => {
      this.user = parent;
      this._findFamily();
      this.formParent.patchValue(this.user);
      this.formFamily.patchValue(this.family);
    });
    this.formParent = this._formBuilder.group({
      loginParent: ['', Validators.required],
      passwordParent: ['', Validators.required],
      nameParent: ['', Validators.required],
      surnameParent: ['', Validators.required],
      emailParent: ['', Validators.required],
      phoneParent: ['', Validators.required],
      birthdayParent: ['', Validators.required],
    });
    this.formFamily = this._formBuilder.group({
      pupils: [[], Validators.required],
      parents: [[], Validators.required],
    })
    this.formParent.disable();
  }

  private _generateTeacherForm(id: number) {
    this._teacherService.findTeacher(id).subscribe((teacher) => {
      this.user = teacher;
      this.formTeacher.patchValue(this.user);
    });
    this.formTeacher = this._formBuilder.group({
      loginTeacher: ['', Validators.required],
      passwordTeacher: ['', Validators.required],
      nameTeacher: ['', Validators.required],
      surnameTeacher: ['', Validators.required],
      emailTeacher: ['', Validators.required],
      phoneTeacher: ['', Validators.required],
      birthdayTeacher: ['', Validators.required],
      subjectTeacher: ['', Validators.required],
    });
    this.formTeacher.disable();
  }

  public changePassword() {
    this.buttonShow = true;
    if (this.role === 'admin'){
      this.formAdmin.get('password')?.enable();
    } else if (this.role === 'teacher') {
      this.formTeacher.get('passwordTeacher')?.enable();
    } else if (this.role === 'pupil') {
      this.formPupil.get('passwordPupil')?.enable();
    } else if (this.role === 'parent') {
      this.formParent.get('passwordParent')?.enable();
    }
  }

  public changePersonalData() {
    this.buttonShow = true;
    if (this.role === 'admin'){
      this.formAdmin.enable();
    } else if (this.role === 'teacher') {
      this.formTeacher.enable();
    } else if (this.role === 'pupil') {
      this.formPupil.enable();
    } else if (this.role === 'parent') {
      this.formParent.enable();
    }
  }

  public saveChanges() {
    if (this.role === 'admin'){
      let data = this.formAdmin.getRawValue();
      data.idAdmin = this.user.idAdmin;
      this._adminService.editAdmin(data).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.buttonShow = false;
          this.formAdmin.disable();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else if (this.role === 'teacher') {
      let data = this.formTeacher.getRawValue();
      data.idTeacher = this.user.idTeacher;
      data.birthdayTeacher = +data.birthdayTeacher;
      this._teacherService.editTeacher(data).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.buttonShow = false;
          this.formTeacher.disable();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else if (this.role === 'pupil') {
      let data = this.formPupil.getRawValue();
      data.idPupil = this.user.idPupil;
      data.idClass = data.classes;
      data.birthdayPupil = +data.birthdayPupil;
      this._pupilService.editPupil(data).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.buttonShow = false;
          this.formPupil.disable();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else if (this.role === 'parent') {
      let data = this.formParent.getRawValue();
      data.idParent = this.user.idParent;
      data.birthdayParent = +data.birthdayParent;
      this._parentService.editParent(data).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.buttonShow = false;
          this.formParent.disable();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    }
  }

  public createBackUp() {
    this._adminService.backUp(this.formCreateBackUp.getRawValue().fileName).subscribe((data) => {
      console.log(data);
      let a = document.createElement('a');
      a.href = URL_API + data;
      a.target = '_blank';
      a.click();
    });
  }

  public applyBackUp() {
    this._adminService.applyBackUp(this.formApplyBackUp.getRawValue().fileBackUp.split(/(\\|\/)/g).pop())
      .subscribe((data) => {
        if(data) {
          console.log(data);
          this._toastrService.showToastr('success', data);
        } else {
          this._toastrService.showToastr('warning', 'Error');
        }
    });
  }

  public uploadFile(files: any) {
    this.progress = 0;
    this.message = '';
    if (files.length === 0) {
      return;
    } else if (files.length === 1) {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this._materialService.uploadMaterial(formData)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.file = event.body;
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    } else {
      this._toastrService.showToastr('danger', 'You can upload only one file');
    }
  }

  public openGrade(id: number) {
    this._route.navigate(['./pages/grade'], {queryParams: {'idPupil': id}});
  }
};
