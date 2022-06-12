import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassSchoolComponent} from "./class-school.component";
import {ClassSchoolListComponent} from "./class-school-list/class-school-list.component";
import {ClassSchoolDetailComponent} from "./class-school-detail/class-school-detail.component";
import {ClassSchoolPupilComponent} from "./class-school-pupil/class-school-pupil.component";

const routes: Routes = [
  {
    path: '',
    component: ClassSchoolComponent,
    children: [
      {
        path: 'list',
        component: ClassSchoolListComponent,
      },
      {
        path: 'detail',
        component: ClassSchoolDetailComponent,
      },
      {
        path: 'pupils',
        component: ClassSchoolPupilComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassSchoolRoutingModule { }
