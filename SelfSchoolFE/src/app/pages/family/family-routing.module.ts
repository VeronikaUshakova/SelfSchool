import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyComponent } from './family.component';
import { FamilyListComponent } from "./family-list/family-list.component";
import { FamilyDetailComponent } from "./family-detail/family-detail.component";

const routes: Routes = [
  {
    path: '',
    component: FamilyComponent,
    children: [
      {
        path: 'list',
        component: FamilyListComponent,
      },
      {
        path: 'detail',
        component: FamilyDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyRoutingModule { }
