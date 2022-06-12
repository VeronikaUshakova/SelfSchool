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
import {Admin} from "../../../classes/admin";
import {IAdminService} from "../../../services/admin.service";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

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
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._adminService.findAdmins().subscribe(data => {
      this.admins = data;
      let adminsModification: any[] = [];
      this.admins.forEach(admin => {
        adminsModification.push({ data: admin });
      })
      this.dataSource = this.dataSourceBuilder.create(adminsModification);
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

  public openEditAdmin(id: number) {
    this._route.navigate(['./pages/admin/detail'], {queryParams: {'idAdmin': id}});
  }

  public exportExcel() {
    let element = document.getElementById('admin-table');
    if(element) {
      this._excelService.exportExcel(element, 'Admins');
    } else {
      this._toastrService.showToastr('warning','Admins are not on the table.')
    }
  }
}
