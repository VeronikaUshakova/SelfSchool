import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonComponent } from './lesson.component';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { LessonDetailComponent } from "./lesson-detail/lesson-detail.component";
import {LessonViewComponent} from "./lesson-view/lesson-view.component";

const routes: Routes = [
  {
    path: '',
    component: LessonComponent,
    children: [
      {
        path: 'list',
        component: LessonListComponent,
      },
      {
        path: 'detail',
        component: LessonDetailComponent,
      },
      {
        path: 'view',
        component: LessonViewComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
