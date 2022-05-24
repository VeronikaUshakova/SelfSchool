import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IToastrService} from "../../../services/toastr.service";
import {IMaterialService} from "../../../services/material.service";
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss']
})
export class MaterialDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public idMaterial: number = 0;
  public message: string = '';
  public progress: number = 0;
  public file: string = '';

  constructor(
    private _http: HttpClient,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _materialService: IMaterialService,
    private _toastrService: IToastrService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idMaterial = Number(data.get('idMaterial'));
      if(this.idMaterial) {
        this._findMaterialSchool();
      }
    })

    this.form = this._formBuilder.group({
      urlMaterial: undefined,
      fileMaterial: undefined,
    })
  }

  private _findMaterialSchool(): void {
    this._materialService.findMaterial(this.idMaterial).subscribe( data => {
      this.form.patchValue(data);
    });
  }

  public saveMaterialSchool() {
    let data = this.form.getRawValue();
    this.idMaterial ? data.idMaterial = this.idMaterial : undefined;
    data.fileMaterial = this.file;
    if (data.fileMaterial || data.urlMaterial) {
      if (!this.idMaterial) {
        this._materialService.createMaterial(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListMaterialSchool();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._materialService.editMaterial(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.openListMaterialSchool();
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

  public deleteMaterialSchool() {
    if (this.idMaterial) {
      this._materialService.deleteMaterial(this.idMaterial).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.openListMaterialSchool();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Material');
    }
  }

  public openListMaterialSchool() {
    this._route.navigate(['./pages/material/list']);
  }

  public uploadFile(files: any) {
    this.progress = 0;
    this.message = '';
    if (files.length === 0) {
      return;
    } else if (files.length === 1) {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this._materialService.uploadMaterial(formData)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.file = event.body;
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    } else {
      this._toastrService.showToastr('danger', 'You can upload only one file');
    }
  }
}
