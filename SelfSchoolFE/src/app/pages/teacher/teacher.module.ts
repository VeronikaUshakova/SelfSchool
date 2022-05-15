import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule } from "@nebular/theme";
import { TeacherListComponent } from "./teacher-list/teacher-list.component";
import { TeacherDetailComponent } from "./teacher-detail/teacher-detail.component";


@NgModule({
  declarations: [
    TeacherComponent,
    TeacherListComponent,
    TeacherDetailComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class TeacherModule { }
