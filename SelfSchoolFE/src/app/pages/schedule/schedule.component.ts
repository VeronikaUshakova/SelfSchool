import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {ILessonService} from "../../services/lesson.service";
import {ITaskLessonService} from "../../services/task-lesson.service";
import {take} from "rxjs";
import {ITeacherService} from "../../services/teacher.service";
import {IUserService} from "../../services/user.service";

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.component.html',
  styleUrls: ['schedule.component.scss'],
})

export class ScheduleComponent implements OnInit {
  public viewDate: Date = new Date();
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public events: CalendarEvent[] = [];

  constructor(
    private _lessonService: ILessonService,
    private _taskLessonService: ITaskLessonService,
    private _teacherService: ITeacherService,
    private _userService: IUserService,
  ) {}

  public ngOnInit(): void {
    this._userService.getUserID()
      .pipe(take(1))
      .subscribe((id) => {
        this._userService.getUserRole()
          .pipe(take(1))
          .subscribe((role) => {
            this._lessonService.findLessons()
              .pipe(take(1))
              .subscribe((lessons) => {
                if(role === 'teacher') {
                  lessons = lessons.filter(lesson => lesson.idTeacher === id);
                }
                lessons.forEach((lesson) => {
                  this.events = [
                    ...this.events,
                    {
                      start: new Date(lesson.dateLesson),
                      title: 'Lesson ' + lesson.nameLesson,
                    }
                  ];
                })
                this._taskLessonService.findTaskLessons()
                  .pipe(take(1))
                  .subscribe((tasks) => {
                    tasks.forEach((task) => {
                      lessons.forEach((lesson) => {
                        if(task.idLesson === lesson.idLesson) {
                          this.events = [
                            ...this.events,
                            {
                              start: new Date(task.dateTask),
                              title: 'Task ' + task.nameTask,
                            }
                          ];
                        }
                      })
                    })
                  })
              })
          })
      });
  }

  public setView(view: CalendarView) {
    this.view = view;
  }
}
