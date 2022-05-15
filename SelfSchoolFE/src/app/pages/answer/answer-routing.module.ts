import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerComponent } from './answer.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';


const routes: Routes = [
  {
    path: '',
    component: AnswerComponent,
    children: [
      {
        path: 'list',
        component: AnswerListComponent,
      },
      {
        path: 'detail',
        component: AnswerDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswerRoutingModule { }
