import { Component, OnInit } from '@angular/core';
import {ITeacherService} from "../../services/teacher.service";
import {Teacher} from "../../classes/teacher";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  public teachers: Teacher[] = [];
  public filterTeachers: Teacher[] = [];

  constructor(
    public _teacherService: ITeacherService,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this._findTeachers();
  }

  private _findTeachers() {
    this._teacherService.findTeachers()
      .pipe(take(1))
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.filterTeachers = teachers;
      })
  }

  public findSubject($event: any) {
    console.log($event)
    if($event.data) {
      this.filterTeachers = this.teachers.filter((teacher) =>
        teacher.nameTeacher.includes($event.data) || teacher.surnameTeacher.includes($event.data) ||
        teacher.subjectTeacher.includes($event.data)
      )
    } else {
      this.filterTeachers = this.teachers;
    }
  }

  public openLessonView(subject: string, idTeacher: number) {
    this._route.navigate(['./pages/lesson/view'], {queryParams:
        {
          'subject': subject,
          'idTeacher': idTeacher
        }
    });
  }
}
