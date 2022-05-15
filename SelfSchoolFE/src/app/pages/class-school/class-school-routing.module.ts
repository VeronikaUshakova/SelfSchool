import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassSchoolComponent } from './class-school.component';

const routes: Routes = [{ path: '', component: ClassSchoolComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassSchoolRoutingModule { }
