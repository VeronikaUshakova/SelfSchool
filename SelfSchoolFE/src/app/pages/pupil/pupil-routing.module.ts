import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PupilComponent } from './pupil.component';

const routes: Routes = [{ path: '', component: PupilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PupilRoutingModule { }
