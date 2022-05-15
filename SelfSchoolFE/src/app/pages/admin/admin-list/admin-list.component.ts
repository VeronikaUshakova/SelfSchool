import { Component, OnInit } from '@angular/core';
import {
  NbSortDirection, NbSortRequest,
  NbTreeGridDataService,
  NbTreeGridDataSource, NbTreeGridDataSourceBuilder,
  NbTreeGridFilterService,
  NbTreeGridService,
  NbTreeGridSortService
} from "@nebular/theme";
import {IAnswerService} from "../../../services/answer.service";
import {Router} from "@angular/router";
import {Admin} from "../../../classes/admin";
import {IAdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  public admins: Admin[] = [];
  public customColumn = 'idAdmin';
  public defaultColumns = [ 'login', 'password'];

  public dataSource: NbTreeGridDataSource<Admin> = new NbTreeGridDataSource<Admin>(new NbTreeGridSortService<Admin>(),
    new NbTreeGridFilterService<Admin>(), new NbTreeGridService<Admin>(), new NbTreeGridDataService<Admin>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Admin>,
    private _adminService: IAdminService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._adminService.findAdmins().subscribe(data => {
      this.admins = data;
      this.dataSource = this.dataSourceBuilder.create(this.admins);
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

  public openNewAdmin() {
    this._route.navigate(['./pages/admin/detail']);
  }
}
