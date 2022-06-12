import { Component, OnInit } from '@angular/core';
import {IPupilService} from "../../../services/pupil.service";
import {IUserService} from "../../../services/user.service";
import {Pupil} from "../../../classes/pupil";
import {take} from "rxjs";
import {IClassSchoolService} from "../../../services/class-school.service";
import {ClassSchool} from "../../../classes/class-school";
import {IFamilyService} from "../../../services/family.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-class-school-pupil',
  templateUrl: './class-school-pupil.component.html',
  styleUrls: ['./class-school-pupil.component.scss']
})
export class ClassSchoolPupilComponent implements OnInit {
  public classSchoolID: number = 0;
  public classSchool: ClassSchool = new ClassSchool(0,0,'');
  public pupils: Pupil[] = [];
  public familyPupilsId: number[] = [];
  public familyPupils: string[] = [];
  public pupilsClass: string[] = [];
  public pupilsInClass: any[] = [];
  public role: any = '';

  constructor(
    private _route: Router,
    private _userService: IUserService,
    private _pupilService: IPupilService,
    private _classSchoolService: IClassSchoolService,
    private _familyService: IFamilyService,
  ) { }

  ngOnInit(): void {
    this._userService.getUserRole()
      .pipe(take(1))
      .subscribe((role) => {
        this.role = role;
        if(role === 'pupil') {
          this._userService.getUserID()
            .pipe(take(1))
            .subscribe((id) => {
              this._pupilService.findPupil(id)
              .pipe(take(1))
              .subscribe((pupil) => {
                this.classSchoolID = pupil.idClass;
                this._classSchoolService.findClassSchool(this.classSchoolID)
                  .pipe(take(1))
                  .subscribe((classSchool) => {
                    this.classSchool = classSchool
                  });
                this._pupilService.findPupils()
                  .pipe(take(1))
                  .subscribe((pupils) => {
                    this.pupils = pupils.filter(p => p.idClass === pupil.idClass);
                })
            })
          })
        } else if(role === 'parent') {
          this._familyService.findFamilies()
            .pipe(take(1))
            .subscribe((families) => {
              families.forEach((family) => {
                family.parents.forEach((parent) => {
                  this._userService.getUserID()
                    .pipe(take(1))
                    .subscribe((id) => {
                      if(parent === id) {
                        family.pupils.forEach((pupil) => {
                          this._pupilService.findPupil(pupil)
                            .pipe(take(1))
                            .subscribe((p) => {
                              this.familyPupilsId.push(p.idPupil);
                              this.familyPupils.push(p.namePupil + ' ' + p.surnamePupil);
                              this._classSchoolService.findClassSchool(p.idClass)
                                .pipe(take(1))
                                .subscribe((classSchool) => {
                                  this.pupilsClass.push(classSchool.numberClass + ' - ' + classSchool.letterClass);
                                  this._pupilService.findPupils()
                                    .pipe(take(1))
                                    .subscribe((pupils) => {
                                      let c:any[] = [];
                                      pupils.forEach((pup) => {
                                        if(pup.idClass === p.idClass) {
                                          c.push(pup.namePupil + ' ' + pup.surnamePupil);
                                        }
                                      })
                                      this.pupilsInClass.push(c);
                                    })
                                })
                            })
                        })
                      }
                    })
                })
              })
            })
        }
      })
  }

  public openGrade(id: number) {
    this._route.navigate(['./pages/grade'], {queryParams: {'idPupil': id}});
  }
}
