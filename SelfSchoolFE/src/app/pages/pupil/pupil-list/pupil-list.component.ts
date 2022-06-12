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
import {Pupil_ext} from "../../../classes/extended/pupil_ext";
import {IClassSchoolService} from "../../../services/class-school.service";
import {IExcelService} from "../../../services/excel.service";
import {IToastrService} from "../../../services/toastr.service";

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
    private _classSchollService: IClassSchoolService,
    private _excelService: IExcelService,
    private _toastrService: IToastrService,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this._pupilService.findPupils().subscribe(data => {
      this.pupils = data;
      let pupilsModification: any[] = [];
      this.pupils.forEach(pupil => {
        let data = pupil as any;
        this._classSchollService.findClassSchool(data.idClass).subscribe(c => {
          let p = new Pupil_ext(pupil.idPupil, pupil.loginPupil, pupil.passwordPupil, pupil.namePupil,
            pupil.surnamePupil, new Date(pupil.birthdayPupil).toDateString(), pupil.emailPupil,
            pupil.phonePupil, c.numberClass + ' - ' + c.letterClass);
          pupilsModification.push({data: p});
          this.dataSource = this.dataSourceBuilder.create(pupilsModification);
        });
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

  public openNewPupil() {
    this._route.navigate(['./pages/pupil/detail']);
  }

  public openEditPupil(id: number) {
    this._route.navigate(['./pages/pupil/detail'], {queryParams: {'idPupil': id}});
  }

  public exportExcel() {
    let element = document.getElementById('pupil-table');
    if(element) {
      this._excelService.exportExcel(element, 'Pupils');
    } else {
      this._toastrService.showToastr('warning','Pupils are not on the table.')
    }
  }
}
