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
import {ClassSchool} from "../../../classes/class-school";
import {IClassSchoolService} from "../../../services/class-school.service";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

@Component({
  selector: 'app-class-school-list',
  templateUrl: './class-school-list.component.html',
  styleUrls: ['./class-school-list.component.scss']
})
export class ClassSchoolListComponent implements OnInit {
  public classSchools: ClassSchool[] = [];
  public customColumn = 'idClass';
  public defaultColumns = ['numberClass', 'letterClass'];

  public dataSource: NbTreeGridDataSource<ClassSchool> = new NbTreeGridDataSource<ClassSchool>(new NbTreeGridSortService<ClassSchool>(),
    new NbTreeGridFilterService<ClassSchool>(), new NbTreeGridService<ClassSchool>(), new NbTreeGridDataService<ClassSchool>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<ClassSchool>,
    private _classSchoolService: IClassSchoolService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._classSchoolService.findClassSchools().subscribe(data => {
      this.classSchools = data;
      let classSchoolModification: any[] = [];
      this.classSchools.forEach(classSchool => {
        classSchoolModification.push({ data: classSchool });
      })
      this.dataSource = this.dataSourceBuilder.create(classSchoolModification);
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

  public openNewClassSchool() {
    this._route.navigate(['./pages/class/detail']);
  }

  public openEditClassSchool(id: number) {
    this._route.navigate(['./pages/class/detail'], {queryParams: {'idClass': id}});
  }

  public exportExcel() {
    let element = document.getElementById('class-table');
    if(element) {
      this._excelService.exportExcel(element, 'Classes');
    } else {
      this._toastrService.showToastr('warning','Classes are not on the table.')
    }
  }
}
