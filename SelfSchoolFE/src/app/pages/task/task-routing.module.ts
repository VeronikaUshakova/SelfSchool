import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      {
        path: 'list',
        component: TaskListComponent,
      },
      {
        path: 'detail',
        component: TaskDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
