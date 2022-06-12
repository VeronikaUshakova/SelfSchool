import { Component, OnInit } from '@angular/core';
import {Answer} from "../../../classes/answer";
import {IAnswerService} from "../../../services/answer.service";
import {
  NbSortDirection,
  NbSortRequest, NbTreeGridDataService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
  NbTreeGridFilterService,
  NbTreeGridService,
  NbTreeGridSortService
} from "@nebular/theme";
import {Router} from "@angular/router";
import {Answer_ext} from "../../../classes/extended/answer_ext";
import {IPupilService} from "../../../services/pupil.service";
import {IMaterialService} from "../../../services/material.service";
import {ITaskLessonService} from "../../../services/task-lesson.service";
import {IToastrService} from "../../../services/toastr.service";
import {IExcelService} from "../../../services/excel.service";
import {IUserService} from "../../../services/user.service";
import {take} from "rxjs";
import {ILessonService} from "../../../services/lesson.service";

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  public answers: Answer[] = [];
  public customColumn = 'idAnswer';
  public defaultColumns = [ 'pupil', 'task', 'gradeAnswer', 'fastAnswer', 'material' ];

  public dataSource: NbTreeGridDataSource<Answer> = new NbTreeGridDataSource<Answer>(new NbTreeGridSortService<Answer>(),
    new NbTreeGridFilterService<Answer>(), new NbTreeGridService<Answer>(), new NbTreeGridDataService<Answer>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Answer>,
    private _answerService: IAnswerService,
    private _pupilService: IPupilService,
    private _materialService: IMaterialService,
    private _taskLessonService: ITaskLessonService,
    private _toastrService: IToastrService,
    private _excelService: IExcelService,
    private _userService: IUserService,
    private _lessonService: ILessonService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._userService.getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this._userService.getUserID()
          .pipe(take(1))
          .subscribe((id) => {
            this._answerService.findAnswers()
              .pipe(take(1))
              .subscribe(answers => {
              let answerModification: any[] = [];
              answers.forEach((answer) => {
                this._pupilService.findPupil(answer.idPupil).subscribe((pupil) => {
                  this._taskLessonService.findTaskLesson(answer.idTask).subscribe((task) => {
                    this._lessonService.findLesson(task.idLesson)
                      .pipe(take(1))
                      .subscribe((lesson) => {
                        if(lesson.idTeacher === id && role === 'teacher') {
                          this._materialService.findMaterial(answer.idMaterial).subscribe((material) => {
                            answerModification.push(
                              {
                                data: new Answer_ext(
                                  answer.idAnswer,
                                  pupil.namePupil + ' '+ pupil.surnamePupil,
                                  task.nameTask,
                                  answer.gradeAnswer,
                                  material.urlMaterial ? (material.fileMaterial ? material.urlMaterial + ' '
                                    + material.fileMaterial : material.urlMaterial) : '',
                                  answer.fastAnswer
                                )
                              });
                            this.answers.push(answer);
                            this.dataSource = this.dataSourceBuilder.create(answerModification);
                          });
                        } else if(role !== 'teacher') {
                          this._materialService.findMaterial(answer.idMaterial).subscribe((material) => {
                            answerModification.push(
                              {
                                data: new Answer_ext(
                                  answer.idAnswer,
                                  pupil.namePupil + ' '+ pupil.surnamePupil,
                                  task.nameTask,
                                  answer.gradeAnswer,
                                  material.urlMaterial ? (material.fileMaterial ? material.urlMaterial + ' '
                                    + material.fileMaterial : material.urlMaterial) : '',
                                  answer.fastAnswer
                                )
                              });
                            this.answers.push(answer);
                            this.dataSource = this.dataSourceBuilder.create(answerModification);
                          });
                        }
                      })
                  });
                });
              });
            });
          })
      })
  }

  public updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  public getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  public getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  public openNewAnswer() {
    this._route.navigate(['./pages/answer/detail']);
  }

  public openEditAnswer(id: number) {
    this._route.navigate(['./pages/answer/detail'], {queryParams: {'idAnswer': id}});
  }

  public exportExcel() {
    let element = document.getElementById('answer-table');
    if(element) {
      this._excelService.exportExcel(element, 'Answers');
    } else {
      this._toastrService.showToastr('warning','Answers are not on the table.')
    }
  }
}
