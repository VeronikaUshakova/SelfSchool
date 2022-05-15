import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AnswerModule } from './answer/answer.module';
import { ClassSchoolModule } from './class-school/class-school.module';
import { FamilyModule } from './family/family.module';
import { LessonModule } from './lesson/lesson.module';
import { MaterialModule } from './material/material.module';
import { ParentModule } from './parent/parent.module';
import { PupilModule } from './pupil/pupil.module';
import { TaskModule } from './task/task.module';
import { TeacherModule } from './teacher/teacher.module';
import {
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbIconModule,
  NbTreeGridModule,
  NbCardModule, NbButtonModule, NbInputModule, NbSelectModule
} from '@nebular/theme';
import {AppRoutingModule} from "../app-routing.module";
import { AdminComponent } from './admin/admin.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';

@NgModule({
  declarations: [
    PagesComponent,
    AdminComponent,
    AdminDetailComponent,
    AdminListComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AnswerModule,
    ClassSchoolModule,
    FamilyModule,
    LessonModule,
    MaterialModule,
    ParentModule,
    PupilModule,
    TaskModule,
    TeacherModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class PagesModule { }
