import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  public items: NbMenuItem[] = [
    {
      title: 'Admins',
      link: 'admin/list',
    },
    {
      title: 'Answers',
      link: 'answer/list',
    },
    {
      title: 'Classes',
      link: 'class/list',
    },
    {
      title: 'Families',
      link: 'family/list',
    },
    {
      title: 'Lessons',
      link: 'lesson/list',
    },
    {
      title: 'Material',
      link: 'material/list',
    },
    {
      title: 'Parents',
      link: 'parent/list',
    },
    {
      title: 'Pupils',
      link: 'pupil/list',
    },
    {
      title: 'Tasks',
      link: 'task/list',
    },
    {
      title: 'Teachers',
      link: 'teacher/list',
    },
  ]

  constructor(private _sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this._sidebarService.toggle(false, 'left');
  }

}
