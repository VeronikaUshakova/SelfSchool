import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { Router } from "@angular/router";
import {IUserService} from "../services/user.service";
import {IAdminService} from "../services/admin.service";
import {IPupilService} from "../services/pupil.service";
import {IParentService} from "../services/parent.service";
import {ITeacherService} from "../services/teacher.service";
import {take} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  public userName: string = '';
  public role: any;

  public items: NbMenuItem[] = [];

  constructor(
    private _sidebarService: NbSidebarService,
    private _userService: IUserService,
    private _adminService: IAdminService,
    private _pupilService: IPupilService,
    private _parentService: IParentService,
    private _teacherService: ITeacherService,
    private _route: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._userService.getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
      this.role = role;
      this._userService.getUserID()
        .pipe(take(1))
        .subscribe((id)=> {
        if(id) {
          if (role === 'admin') {
            this._adminService.findAdmin(id)
              .pipe(take(1))
              .subscribe((data) => {
              data.login ? this.userName = data.login : '';
            })
          } else if (role === 'parent') {
            this._parentService.findParent(id)
              .pipe(take(1))
              .subscribe((data) => {
              data.nameParent && data.surnameParent ?
                this.userName = data.nameParent + ' ' + data.surnameParent :
                '';
            })
          } else if (role === 'pupil') {
            this._pupilService.findPupil(id)
              .pipe(take(1))
              .subscribe((data) => {
              data.namePupil && data.surnamePupil ?
                this.userName = data.namePupil + ' ' + data.surnamePupil :
                '';
            })
          } else if (role === 'teacher') {
            this._teacherService.findTeacher(id)
              .pipe(take(1))
              .subscribe((data) => {
              data.nameTeacher && data.surnameTeacher ?
                this.userName = data.nameTeacher + ' ' + data.surnameTeacher :
                '';
            })
          }
        } else {
          this.logOut();
        }
      });
      this.items = [
        {
          data: 'pages.admins',
          title: '',
          link: 'admin/list',
          hidden: this.role !== 'admin'
        },
        {
          data: 'pages.answers',
          title: '',
          link: 'answer/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.classes',
          title: '',
          link: 'class/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.families',
          title: '',
          link: 'family/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.lessons',
          title: '',
          link: 'lesson/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.materials',
          title: '',
          link: 'material/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.parents',
          title: '',
          link: 'parent/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.pupils',
          title: '',
          link: 'pupil/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.tasks',
          title: '',
          link: 'task/list',
          hidden: this.role !== 'admin' && this.role !== 'teacher'
        },
        {
          data: 'pages.teachers',
          title: '',
          link: 'teacher/list',
          hidden: this.role !== 'admin'
        },
        {
          data: 'pages.class',
          title: '',
          link: 'class/pupils',
          hidden: this.role !== 'pupil' && this.role !== 'parent'
        },
        {
          data: 'pages.schedule',
          title: '',
          link: 'schedule',
          hidden: this.role !== 'pupil' && this.role !== 'parent' && this.role !== 'teacher'
        },
        {
          data: 'pages.subjects',
          title: '',
          link: 'subject',
          hidden: this.role !== 'pupil'
        },
      ]
    });

    this.translateMenuItems();
  }

  public toggleMenu() {
    this._sidebarService.toggle(false, 'left');
  }

  public openPersonalCabinet() {
    this._route.navigate(['./pages/personal-cabinet']);
  }

  public openCharts() {
    this._route.navigate(['./chart']);
  }

  public logOut() {
    this._route.navigate(['./login']);
  }

  public useLanguage(language: string): void {
    this.translate.use(language);
    this.translateMenuItems();
  }

  public getAdmin() {
    return this.translate.instant('pages.admin');
  }

  public translateMenuItems()
  {
    this.items.forEach(item => this.translateMenuItem( item ) );
  }

  public translateMenuItem( menuItem: NbMenuItem )
  {
    if ( menuItem.children != null )
    {
      menuItem.children.forEach( item => this.translateMenuItem( item ) );
    }
    menuItem.title = this.translate.instant(menuItem.data);
  }
}
