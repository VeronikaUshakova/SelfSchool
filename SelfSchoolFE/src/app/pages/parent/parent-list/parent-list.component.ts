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
import {Parent} from "../../../classes/parent";
import {IParentService} from "../../../services/parent.service";

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent implements OnInit {

  public parents: Parent[] = [];
  public customColumn = 'idParent';
  public defaultColumns = ['loginParent', 'passwordParent', 'nameParent', 'surnameParent',
    'birthdayParent', 'emailParent', 'phoneParent'];

  public dataSource: NbTreeGridDataSource<Parent> = new NbTreeGridDataSource<Parent>(new NbTreeGridSortService<Parent>(),
    new NbTreeGridFilterService<Parent>(), new NbTreeGridService<Parent>(), new NbTreeGridDataService<Parent>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Parent>,
    private _parentService: IParentService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._parentService.findParents().subscribe(data => {
      this.parents = data;
      this.dataSource = this.dataSourceBuilder.create(this.parents);
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

  public openNewParent() {
    this._route.navigate(['./pages/parent/detail']);
  }
}
