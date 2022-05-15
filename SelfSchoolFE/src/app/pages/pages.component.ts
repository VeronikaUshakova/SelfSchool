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
      title: 'Admin',
      link: 'admin/list',
    },
    {
      title: 'Answer',
      link: 'answer/list',
    },
    {
      title: 'Class',
      link: 'class/list',
    },
    {
      title: 'Family',
      link: 'family',
    },
    {
      title: 'Lesson',
      link: 'lesson',
    },
    {
      title: 'Material',
      link: 'material',
    },
    {
      title: 'Parent',
      link: 'parent',
    },
    {
      title: 'Pupil',
      link: 'pupil',
    },
    {
      title: 'Task',
      link: 'task',
    },
    {
      title: 'Teacher',
      link: 'teacher',
    },
  ]

  constructor(private _sidebarService: NbSidebarService) { }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this._sidebarService.toggle(false, 'left');
  }

}
