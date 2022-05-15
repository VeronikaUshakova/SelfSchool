import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PupilComponent } from './pupil.component';
import { PupilListComponent } from "./pupil-list/pupil-list.component";
import { PupilDetailComponent } from "./pupil-detail/pupil-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PupilComponent,
    children: [
      {
        path: 'list',
        component: PupilListComponent,
      },
      {
        path: 'detail',
        component: PupilDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PupilRoutingModule { }
