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

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  public answers: Answer[] = [];
  public customColumn = 'idAnswer';
  public defaultColumns = [ 'pupils', 'tasks', 'gradeAnswer', 'fastAnswer' ];

  public dataSource: NbTreeGridDataSource<Answer> = new NbTreeGridDataSource<Answer>(new NbTreeGridSortService<Answer>(),
    new NbTreeGridFilterService<Answer>(), new NbTreeGridService<Answer>(), new NbTreeGridDataService<Answer>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Answer>,
    private _answerService: IAnswerService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._answerService.findAnswers().subscribe(data => {
      this.answers = data;
      this.dataSource = this.dataSourceBuilder.create(this.answers);
    });
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
}
