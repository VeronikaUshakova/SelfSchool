import { Component, OnInit } from '@angular/core';
import {Lesson} from "../../../classes/lesson";
import {ILessonService} from "../../../services/lesson.service";
import {take} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {
  public subject: string = '';
  public idTeacher: number = 0;

  public lessons: Lesson[] = [];
  public filterLessons: Lesson[] = [];

  constructor(
    private _lessonService: ILessonService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.subject = data.get('subject') || '';
      this.idTeacher = Number(data.get('idTeacher'));
      this._findLessons();
    })
  }

  private _findLessons() {
    this._lessonService.findLessons()
      .pipe(take(1))
      .subscribe((lessons) => {
        this.lessons = lessons.filter(lesson => lesson.idTeacher === this.idTeacher)
          .sort((a, b) => (a.dateLesson < b.dateLesson) ? 1 : -1);;
        this.filterLessons = this.lessons;
      })
  }

  public findLesson($event: any) {
    if($event.data) {
      this.filterLessons = this.lessons.filter((lesson) =>
        lesson.nameLesson.includes($event.data)
      )
    } else {
      this.filterLessons = this.lessons;
    }
  }

  public openTaskView(idLesson: number) {
    this._route.navigate(['./pages/task/view'], {queryParams:
        {
          'idLesson': idLesson,
        }
    });
  }
}
