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
import {Parent_ext} from "../../../classes/extended/parent_ext";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

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
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._parentService.findParents().subscribe(data => {
      this.parents = data;
      let parentsModification: any[] = [];
      this.parents.forEach(parent => {
        let p = new Parent_ext(parent.idParent, parent.loginParent, parent.passwordParent,parent.nameParent,
          parent.surnameParent, new Date(parent.birthdayParent).toDateString(), parent.emailParent, parent.phoneParent);
        parentsModification.push({ data: p });
      })
      this.dataSource = this.dataSourceBuilder.create(parentsModification);
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

  public openEditParent(id: number) {
    this._route.navigate(['./pages/parent/detail'], {queryParams: {'idParent': id}});
  }

  public exportExcel() {
    let element = document.getElementById('parent-table');
    if(element) {
      this._excelService.exportExcel(element, 'Parents');
    } else {
      this._toastrService.showToastr('warning','Parents are not on the table.')
    }
  }
}
