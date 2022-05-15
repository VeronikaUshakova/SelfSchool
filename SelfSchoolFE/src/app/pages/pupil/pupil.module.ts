import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PupilRoutingModule } from './pupil-routing.module';
import { PupilComponent } from './pupil.component';


@NgModule({
  declarations: [
    PupilComponent
  ],
  imports: [
    CommonModule,
    PupilRoutingModule
  ]
})
export class PupilModule { }
