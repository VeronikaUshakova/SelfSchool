import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { LessonDetailComponent } from "./lesson-detail/lesson-detail.component";
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule} from "@nebular/theme";


@NgModule({
  declarations: [
    LessonComponent,
    LessonListComponent,
    LessonDetailComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class LessonModule { }
