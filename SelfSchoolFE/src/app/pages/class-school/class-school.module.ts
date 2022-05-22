import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassSchoolRoutingModule } from './class-school-routing.module';
import { ClassSchoolComponent } from './class-school.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule
} from "@nebular/theme";
import { ClassSchoolListComponent } from "./class-school-list/class-school-list.component";
import { ClassSchoolDetailComponent } from "./class-school-detail/class-school-detail.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClassSchoolComponent,
    ClassSchoolListComponent,
    ClassSchoolDetailComponent,
  ],
  imports: [
    CommonModule,
    ClassSchoolRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
  ]
})
export class ClassSchoolModule { }
