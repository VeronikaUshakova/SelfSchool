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
import {IPupilService} from "../../../services/pupil.service";
import {IParentService} from "../../../services/parent.service";
import {Family_ext} from "../../../classes/extended/family_ext";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {
  public families: Family[] = [];
  public customColumn = 'idFamily';
  public defaultColumns = ['parents', 'pupils'];

  public dataSource: NbTreeGridDataSource<Family> = new NbTreeGridDataSource<Family>(new NbTreeGridSortService<Family>(),
    new NbTreeGridFilterService<Family>(), new NbTreeGridService<Family>(), new NbTreeGridDataService<Family>());

  public sortColumn: string = '';
  public sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<Family>,
    private _familyService: IFamilyService,
    private _pupilService: IPupilService,
    private _parentService: IParentService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._familyService.findFamilies().subscribe(data => {
      this.families = data;
      let familyModification: any[] = [];
      this.families.forEach((family) => {
        let parents = '';
        let pupils = '';

        family.parents.forEach((parent) => {
          this._parentService.findParent(parent).subscribe((dataPt) => {
            parents.length === 0 ? parents = dataPt.nameParent + ' ' + dataPt.surnameParent
              : parents += (', ' + dataPt.nameParent + ' ' + dataPt.surnameParent);
          });
        });

        setTimeout(() => {
          family.pupils.forEach((pupil) => {
            this._pupilService.findPupil(pupil).subscribe((dataPl) => {
              pupils.length === 0 ? pupils = dataPl.namePupil + ' ' + dataPl.surnamePupil
                : pupils += (', ' + dataPl.namePupil+ ' ' + dataPl.surnamePupil);
            });
          })
        }, 0)

        setTimeout(() => {
          familyModification.push({data: new Family_ext(family.idFamily, parents, pupils)});
          this.dataSource = this.dataSourceBuilder.create(familyModification);
        }, 1000);
      })
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

  public openEditFamily(id: number) {
    this._route.navigate(['./pages/family/detail'], {queryParams: {'idFamily': id}});
  }

  public exportExcel() {
    let element = document.getElementById('family-table');
    if(element) {
      this._excelService.exportExcel(element, 'Families');
    } else {
      this._toastrService.showToastr('warning','Families are not on the table.')
    }
  }
}
