import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnswerComponent} from "../answer/answer.component";
import {AnswerListComponent} from "../answer/answer-list/answer-list.component";
import {AnswerDetailComponent} from "../answer/answer-detail/answer-detail.component";
import {AdminComponent} from "./admin.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {AdminDetailComponent} from "./admin-detail/admin-detail.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'list',
        component: AdminListComponent,
      },
      {
        path: 'detail',
        component: AdminDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
