import { Component, OnInit } from '@angular/core';
import {
  NbSortDirection, NbSortRequest,
  NbTreeGridDataService,
  NbTreeGridDataSource, NbTreeGridDataSourceBuilder,
  NbTreeGridFilterService,
  NbTreeGridService,
  NbTreeGridSortService
} from "@nebular/theme";
import {Router} from "@angular/router";
import {Teacher} from "../../../classes/teacher";
import {ITeacherService} from "../../../services/teacher.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  public teachers: Teacher[] = [];
  public customColumn = 'idTeacher';
  public defaultColumns = ['loginTeacher', 'passwordTeacher', 'nameTeacher', 'surnameTeacher',
    'birthdayTeacher', 'emailTeacher', 'phoneTeacher', 'subjectTeacher'];

  public dataSource: NbTreeGridDataSource<Teacher> = new NbTreeGridDataSource<Teacher>(new NbTreeGridSortService<Teacher>(),
    new NbTreeGridFilterService<Teacher>(), new NbTreeGridService<Teacher>(), new NbTreeGridDataService<Teacher>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Teacher>,
    private _teacherService: ITeacherService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._teacherService.findTeachers().subscribe(data => {
      this.teachers = data;
      this.dataSource = this.dataSourceBuilder.create(this.teachers);
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

  public openNewTeacher() {
    this._route.navigate(['./pages/teacher/detail']);
  }
}
