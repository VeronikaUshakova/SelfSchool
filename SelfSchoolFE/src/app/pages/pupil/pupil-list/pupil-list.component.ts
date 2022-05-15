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
import {Pupil} from "../../../classes/pupil";
import {IPupilService} from "../../../services/pupil.service";

@Component({
  selector: 'app-pupil-list',
  templateUrl: './pupil-list.component.html',
  styleUrls: ['./pupil-list.component.scss']
})
export class PupilListComponent implements OnInit {

  public pupils: Pupil[] = [];
  public customColumn = 'idPupil';
  public defaultColumns = ['loginPupil', 'passwordPupil', 'namePupil', 'surnamePupil',
    'birthdayPupil', 'emailPupil', 'phonePupil', 'classes'];

  public dataSource: NbTreeGridDataSource<Pupil> = new NbTreeGridDataSource<Pupil>(new NbTreeGridSortService<Pupil>(),
    new NbTreeGridFilterService<Pupil>(), new NbTreeGridService<Pupil>(), new NbTreeGridDataService<Pupil>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Pupil>,
    private _pupilService: IPupilService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._pupilService.findPupils().subscribe(data => {
      this.pupils = data;
      this.dataSource = this.dataSourceBuilder.create(this.pupils);
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

  public openNewPupil() {
    this._route.navigate(['./pages/pupil/detail']);
  }
}
