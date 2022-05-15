import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassSchoolRoutingModule } from './class-school-routing.module';
import { ClassSchoolComponent } from './class-school.component';


@NgModule({
  declarations: [
    ClassSchoolComponent
  ],
  imports: [
    CommonModule,
    ClassSchoolRoutingModule
  ]
})
export class ClassSchoolModule { }
