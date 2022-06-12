import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Pupil} from "../../classes/pupil";
import {IPupilService} from "../../services/pupil.service";
import {take} from "rxjs";
import {ITeacherService} from "../../services/teacher.service";
import {ILessonService} from "../../services/lesson.service";
import {ITaskLessonService} from "../../services/task-lesson.service";
import {IAnswerService} from "../../services/answer.service";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {

  private idPupil: number = 0;
  public gradePupil: any[] = [];
  public pupil: Pupil = new Pupil(0,'', '', '', '', 0,
    '', '', 0);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pupilService: IPupilService,
    private _teacherService: ITeacherService,
    private _lessonService: ILessonService,
    private _taskLessonService: ITaskLessonService,
    private _answerService: IAnswerService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idPupil = Number(data.get('idPupil'));

      if(this.idPupil) {
        this._pupilService.findPupil(this.idPupil)
          .pipe(take(1))
          .subscribe(pupil => {
            this.pupil = pupil;
            this._teacherService.findTeachers()
              .pipe(take(1))
              .subscribe((teachers) => {
                teachers.forEach((teacher, i) => {
                  this.gradePupil.push({
                    subject: teacher.subjectTeacher,
                    grade: [],
                    avgGrade: 0
                  })
                  this._lessonService.findLessons()
                    .pipe(take(1))
                    .subscribe((lessons) => {
                      lessons.forEach((lesson) => {
                        this._taskLessonService.findTaskLessons()
                          .pipe(take(1))
                          .subscribe((tasks) => {
                            tasks.forEach((task) => {
                              this._answerService.findAnswers()
                                .pipe(take(1))
                                .subscribe((answers) => {
                                  answers.forEach((answer) => {
                                    if(answer.idPupil === this.idPupil &&
                                    answer.idTask === task.idTask &&
                                    task.idLesson === lesson.idLesson &&
                                    lesson.idTeacher === teacher.idTeacher) {
                                      this.gradePupil[i].grade.push(answer.gradeAnswer);
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
    })
  }

  public avg(grade: number[]): number {
    const sum = grade.reduce((a, b) => a + b, 0);
    const avg = (sum / grade.length) || 0;
    return  Math.round(avg);
  }

  public generateReport(){
    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "letter",
    });

    doc.text("Report " + this.pupil.namePupil + ' ' + this.pupil.surnamePupil, 10, 10);

    const rows: any[] = [];

    this.gradePupil.forEach((grade) => {
      rows.push([ grade.subject,  grade.grade.join(', '), this.avg(grade.grade) || '' ]);
    })

    autoTable(doc, {
      head: [['Subject', 'Grade', 'Average Grade']],
      body: [...rows]
    })

    doc.save(this.pupil.namePupil+'_'+this.pupil.surnamePupil+'_table.pdf');
  }
}
