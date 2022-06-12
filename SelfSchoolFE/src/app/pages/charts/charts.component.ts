import { Component, OnInit } from '@angular/core';
import {IClassSchoolService} from "../../services/class-school.service";
import {finalize, take} from "rxjs";
import {IPupilService} from "../../services/pupil.service";
import {LegendPosition} from "@swimlane/ngx-charts";
import {IUserService} from "../../services/user.service";
import {ILessonService} from "../../services/lesson.service";
import {ITaskLessonService} from "../../services/task-lesson.service";
import {IAnswerService} from "../../services/answer.service";
import {RoleEnum} from "../../shared/constants";
import {ITeacherService} from "../../services/teacher.service";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  public role: any = '';

  public dataFirst: any[] = [];
  public dataSecond: any[] = [];
  public dataThird: any[] = [];
  public dataFourth: any[] = [];

  public view: [number, number] = [500, 500];

  public gradient: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = false;
  public legendPosition: LegendPosition = 'below' as LegendPosition;

  public showXAxis = true;
  public showYAxis = true;
  public showXAxisLabel = true;
  public xAxisLabelSecond = 'Grade';
  public xAxisLabelThird = 'Subject';
  public xAxisLabelFourth = 'Subject';
  public showYAxisLabel = true;
  public yAxisLabelSecond = 'Count';
  public yAxisLabelThird = 'Average Grade';
  public yAxisLabelFourth = 'Count';

  constructor(
    private _classSchoolService: IClassSchoolService,
    private _pupilService: IPupilService,
    private _userService: IUserService,
    private _lessonService: ILessonService,
    private _taskLessonService: ITaskLessonService,
    private _answerService: IAnswerService,
    private _teacherService: ITeacherService,
  ) { }

  ngOnInit(): void {
    this._userService.getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this.role = role;
        if(this.role === 'teacher') {
          this.firstGraph();
          this.secondGraph();
        } else if(this.role === 'pupil') {
          this.thirdGraph();
          this.fourthGraph();
        }
      })
  }

  private firstGraph() {
    this._classSchoolService.findClassSchools()
      .pipe(take(1))
      .subscribe((classesSchool) => {
        classesSchool.forEach((classSchool, i) => {
          this._pupilService.findPupils()
            .pipe(take(1))
            .subscribe((pupils) => {
              pupils.forEach((pupil) => {
                if(pupil.idClass === classSchool.idClass) {
                  if(this.dataFirst.length <= i) {
                    this.dataFirst = [
                      ...this.dataFirst,
                      {
                        name: classSchool.numberClass + ' - ' + classSchool.letterClass,
                        value: 1,
                      }
                    ]
                  } else {
                    this.dataFirst[i].value += 1;
                  }
                }
              })
            })
        })
      })
  }

  private secondGraph() {
    for(let i = 0; i < 12; i++) {
      this.dataSecond = [
        ...this.dataSecond,
        {
          name: `${i+1}`,
          value: 0,
        }
      ]
    }
    this._userService.getUserID()
      .pipe(take(1))
      .subscribe((id) => {
        this._lessonService.findLessons()
          .pipe(take(1))
          .subscribe((lessons) => {
            lessons.forEach((lesson) => {
              this._taskLessonService.findTaskLessons()
                .pipe(take(1))
                .subscribe((taskLessons) => {
                  taskLessons.forEach((taskLesson) => {
                    this._answerService.findAnswers()
                      .pipe(take(1))
                      .subscribe((answers) => {
                        answers.forEach((answer) => {
                          if(answer.idTask === taskLesson.idTask
                          && taskLesson.idLesson === lesson.idLesson
                          && lesson.idTeacher === id && answer.gradeAnswer > 0) {
                            this.dataSecond[answer.gradeAnswer-1].value += 1;
                            this.dataSecond = [...this.dataSecond];
                          }
                        })
                      })
                  })
                })
            })
          })
      })
  }


  private thirdGraph() {
    this._teacherService.findTeachers()
      .pipe(take(1))
      .subscribe((teachers) => {
        teachers.forEach((teacher, i) => {
          let countGrade: number = 0;
          let sumGrade: number = 0;
          this.dataThird = [
            ...this.dataThird,
            {
              name: teacher.subjectTeacher,
              value: 0,
            }
          ]
          this._lessonService.findLessons()
            .pipe(take(1))
            .subscribe((lessons) => {
              lessons.forEach((lesson) => {
                this._taskLessonService.findTaskLessons()
                  .pipe(take(1))
                  .subscribe((taskLessons) => {
                    taskLessons.forEach((taskLesson) => {
                      this._answerService.findAnswers()
                        .pipe(take(1))
                        .subscribe((answers) => {
                          answers.forEach((answer) => {
                            this._userService.getUserID()
                              .pipe(
                                take(1),
                                finalize(() => {
                                  if(countGrade && sumGrade) {
                                    this.dataThird[i].value = sumGrade / countGrade;
                                    this.dataThird = [...this.dataThird]
                                  }
                                }))
                              .subscribe((id) => {
                                if(teacher.idTeacher === lesson.idTeacher
                                && lesson.idLesson === taskLesson.idLesson
                                && taskLesson.idTask === answer.idTask
                                && answer.idPupil === id && answer.gradeAnswer > 0)
                                {
                                  countGrade++;
                                  sumGrade += answer.gradeAnswer;
                                }
                              })
                          })
                        })
                    })
                  })
              })
            })
        })
      })
  }

  private fourthGraph() {
    this._teacherService.findTeachers()
      .pipe(take(1))
      .subscribe((teachers) => {
        teachers.forEach((teacher, i) => {
          let countGrade: number = 0;
          let sumGrade: number = 0;
          this.dataFourth = [
            ...this.dataFourth,
            {
              name: teacher.subjectTeacher,
              value: 0,
            }
          ]
          this._lessonService.findLessons()
            .pipe(take(1))
            .subscribe((lessons) => {
              lessons.forEach((lesson) => {
                this._taskLessonService.findTaskLessons()
                  .pipe(take(1))
                  .subscribe((taskLessons) => {
                    taskLessons.forEach((taskLesson) => {
                      this._answerService.findAnswers()
                        .pipe(take(1))
                        .subscribe((answers) => {
                          answers.forEach((answer) => {
                            this._userService.getUserID()
                              .pipe(take(1))
                              .subscribe((id) => {
                                if(teacher.idTeacher === lesson.idTeacher
                                  && lesson.idLesson === taskLesson.idLesson
                                  && taskLesson.idTask === answer.idTask
                                  && answer.idPupil === id && answer.gradeAnswer > 0)
                                {
                                  this.dataFourth[i].value += 1;
                                  this.dataFourth = [...this.dataFourth]
                                }
                              })
                          })
                        })
                    })
                  })
              })
            })
        })
      })
  }
}
