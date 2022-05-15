import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent.component';
import { ParentListComponent } from "./parent-list/parent-list.component";
import { ParentDetailComponent } from "./parent-detail/parent-detail.component";

const routes: Routes = [
  {
    path: '',
    component: ParentComponent,
    children: [
      {
        path: 'list',
        component: ParentListComponent,
      },
      {
        path: 'detail',
        component: ParentDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
