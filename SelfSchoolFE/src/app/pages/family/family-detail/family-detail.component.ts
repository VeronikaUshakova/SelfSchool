import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IFamilyService} from "../../../services/family.service";
import {IToastrService} from "../../../services/toastr.service";
import {IPupilService} from "../../../services/pupil.service";
import {IParentService} from "../../../services/parent.service";
import {Pupil} from "../../../classes/pupil";
import {Parent} from "../../../classes/parent";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idFamily: number = 0;

  public pupils: Pupil[] = [];
  public parents: Parent[] = [];

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _familyService: IFamilyService,
    private _pupilService: IPupilService,
    private _parentService: IParentService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._findParents();
    this._findPupils();

    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idFamily = Number(data.get('idFamily'));
      if(this.idFamily) {
        this._findFamily();
      }
    })

    this.form = this._formBuilder.group({
      pupils: [[], Validators.required],
      parents: [[], Validators.required],
    })
  }

  private _findFamily(): void {
    this._familyService.findFamily(this.idFamily).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  private _findPupils(): void {
    this._pupilService.findPupils().subscribe( data => {
      this.pupils = data;
    });
  }

  private _findParents(): void {
    this._parentService.findParents().subscribe( data => {
      this.parents = data;
    });
  }

  public saveFamily() {
    let data = this.form.getRawValue();
    this.idFamily ? data.idFamily = this.idFamily : undefined;
    if(this.form.valid) {
      if (!this.idFamily) {
        this._familyService.createFamily(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListFamily();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._familyService.editFamily(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListFamily();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      }
    }else {
      this._toastrService.showToastr('danger', 'Please, check fields');
    }
  }

  public deleteFamily() {
    if (this.idFamily) {
      this._familyService.deleteFamily(this.idFamily).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListFamily();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Family');
    }
  }

  public openListFamily() {
    this._route.navigate(['./pages/family/list']);
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
