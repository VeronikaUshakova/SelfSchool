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
import {Material} from "../../../classes/material";
import {IMaterialService} from "../../../services/material.service";

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  public materials: Material[] = [];
  public customColumn = 'idMaterial';
  public defaultColumns = ['nameMaterial', 'teachers', 'dateMaterial', 'materials'];

  public dataSource: NbTreeGridDataSource<Material> = new NbTreeGridDataSource<Material>(new NbTreeGridSortService<Material>(),
    new NbTreeGridFilterService<Material>(), new NbTreeGridService<Material>(), new NbTreeGridDataService<Material>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Material>,
    private _materialService: IMaterialService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._materialService.findMaterials().subscribe(data => {
      this.materials = data;
      this.dataSource = this.dataSourceBuilder.create(this.materials);
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

  public openNewMaterial() {
    this._route.navigate(['./pages/material/detail']);
  }
}
