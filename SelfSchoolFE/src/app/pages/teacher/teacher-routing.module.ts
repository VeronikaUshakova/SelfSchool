import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import {PupilComponent} from "../pupil/pupil.component";
import {PupilListComponent} from "../pupil/pupil-list/pupil-list.component";
import {PupilDetailComponent} from "../pupil/pupil-detail/pupil-detail.component";
import {TeacherListComponent} from "./teacher-list/teacher-list.component";
import {TeacherDetailComponent} from "./teacher-detail/teacher-detail.component";

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'list',
        component: TeacherListComponent,
      },
      {
        path: 'detail',
        component: TeacherDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
