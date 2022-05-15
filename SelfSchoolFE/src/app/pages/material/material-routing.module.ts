import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { MaterialListComponent } from "./material-list/material-list.component";
import { MaterialDetailComponent } from "./material-detail/material-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    children: [
      {
        path: 'list',
        component: MaterialListComponent,
      },
      {
        path: 'detail',
        component: MaterialDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
