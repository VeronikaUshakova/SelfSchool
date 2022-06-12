import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IAnswerService} from "../../../services/answer.service";
import {IToastrService} from "../../../services/toastr.service";
import {IPupilService} from "../../../services/pupil.service";
import {IMaterialService} from "../../../services/material.service";
import {ITaskLessonService} from "../../../services/task-lesson.service";
import {Pupil} from "../../../classes/pupil";
import {Material} from "../../../classes/material";
import {TaskLesson} from "../../../classes/task-lesson";
import {IUserService} from "../../../services/user.service";
import {take} from "rxjs";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {URL_API} from "../../../shared/constants";
import {Answer} from "../../../classes/answer";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.scss']
})
export class AnswerDetailComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public idAnswer: number = 0;
  public idTask: number = 0;
  public idMaterial: number = 0;
  public file: any = undefined;

  public answer = new Answer(0, 0, 0, 0, 0,'')

  public pupils: Pupil[] = [];
  public materials: Material[] = [];
  public tasks: TaskLesson[] = [];

  public role: any;

  public message: string = '';
  public progress: number = 0;

  constructor(
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _answerService: IAnswerService,
    private _pupilService: IPupilService,
    private _materialService: IMaterialService,
    private _taskService: ITaskLessonService,
    private _toastrService: IToastrService,
    private _userService: IUserService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._findMaterials();
    this._findPupils();
    this._findTasks();

    this._activatedRoute.queryParamMap.subscribe(data => {
      this.idAnswer = Number(data.get('idAnswer'));
      this.idTask = Number(data.get('idTask'));

      if(this.idAnswer) {
        this._findAnswer();
      }

      this.form = this._formBuilder.group({
        idPupil: ['', Validators.required],
        idTask: ['', Validators.required],
        gradeAnswer: null,
        idMaterial: ['', Validators.required],
        fastAnswer: null,
      })

      this._userService.getUserRole()
        .pipe(take(1))
        .subscribe((role) => {
          this.role = role;
          if(role === 'pupil') {
            this.form.disable();
            this._userService.getUserID()
              .pipe(take(1))
              .subscribe((id) => {
                this._pupilService.findPupil(id)
                  .pipe(take(1))
                  .subscribe((pupil) => {
                    this.form.get('idPupil')?.setValue(pupil.idPupil);
                  })
              })
          } else if(role === 'teacher') {
            this.form.disable();
            this.form.get('gradeAnswer')?.enable();
          }
          if(this.idTask) {
            this.form.get('idTask')?.setValue(this.idTask);
            this.form.get('idTask')?.disable();
            this._answerService.findAnswers()
              .pipe(take(1))
              .subscribe((answers) => {
                answers.forEach((answer) => {
                  if(answer.idTask === this.idTask) {
                    this.idAnswer = answer.idAnswer;
                    this.idMaterial = answer.idMaterial;
                    this._findAnswer();
                  }
                })
              })
          }
        })
    })
  }

  private _findPupils(): void {
    this._pupilService.findPupils().subscribe(data => {
      this.pupils = data;
    })
  }

  private _findMaterials(): void {
    this._materialService.findMaterials().subscribe(data => {
      this.materials = data;
    })
  }

  private _findTasks(): void {
    this._taskService.findTaskLessons().subscribe(data => {
      this.tasks = data;
    })
  }

  private _findAnswer(): void {
    this._answerService.findAnswer(this.idAnswer).subscribe( data => {
      this.answer = data;
      this.idAnswer = this.answer.idAnswer;
      this.form.patchValue(data);
    });
  }

  public saveAnswer() {
    let data = this.form.getRawValue();
    if(!data.gradeAnswer) {
      data.gradeAnswer = 0;
    }
    if(!data.fastAnswer) {
      data.fastAnswer = '';
    }
    if(!data.idMaterial) {
      data.idMaterial = this.idMaterial;
    }
    this.idAnswer ? data.idAnswer = this.idAnswer : undefined;
    if(this.form.valid || this.role === 'pupil') {
      if (!this.idAnswer) {
        this._answerService.createAnswer(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.cancel();
          },
          err => {
            console.log(err);
            this._toastrService.showToastr('danger', err.error.text);
          })
      } else {
        this._answerService.editAnswer(data).subscribe(
          res => {
            console.log(res);
            this._toastrService.showToastr('success', res);
            this.cancel();
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

  public deleteAnswer() {
    if (this.idAnswer) {
      this._answerService.deleteAnswer(this.idAnswer).subscribe(
        res => {
          console.log(res);
          this._toastrService.showToastr('success', res);
          this.cancel();
        },
        err => {
          console.log(err);
          this._toastrService.showToastr('danger', err.error.text);
        })
    } else {
      this._toastrService.showToastr('danger', 'Please, check Answer');
    }
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
              this._materialService.createMaterial({
                urlMaterial: this.file,
                fileMaterial: this.file,
              })
                .pipe(take(1))
                .subscribe(data => {
                  this._materialService.findMaterials()
                    .pipe(take(1))
                    .subscribe((materials) => {
                      materials.forEach(m => {
                        if (m.fileMaterial === this.file) {
                          this.idMaterial = m.idMaterial;
                        }
                      })
                    })
                });
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    } else {
      this._toastrService.showToastr('danger', 'You can upload only one file');
    }
  }

  public fileLink(){
    this._materialService.findMaterial(this.idMaterial)
      .pipe(take(1))
      .subscribe((material) => {
      if(material.idMaterial === this.idMaterial) {
        let a = document.createElement('a');
        a.href = URL_API + material.fileMaterial;
        a.target = '_blank';
        a.click();
      }
    })
  }

  public cancel() {
    history.back();
  }

  public getTranslate(id: string) {
    return this.translate.instant(id);
  }
}
