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
import {Family} from "../../../classes/family";
import {IFamilyService} from "../../../services/family.service";

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  public families: Family[] = [];
  public customColumn = 'idClass';
  public defaultColumns = ['teachers', 'numberClass', 'letterClass'];

  public dataSource: NbTreeGridDataSource<Family> = new NbTreeGridDataSource<Family>(new NbTreeGridSortService<Family>(),
    new NbTreeGridFilterService<Family>(), new NbTreeGridService<Family>(), new NbTreeGridDataService<Family>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Family>,
    private _familyService: IFamilyService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._familyService.findFamilies().subscribe(data => {
      this.families = data;
      this.dataSource = this.dataSourceBuilder.create(this.families);
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

  public openNewFamily() {
    this._route.navigate(['./pages/family/detail']);
  }
}
