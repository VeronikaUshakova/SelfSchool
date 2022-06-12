import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { LessonDetailComponent } from "./lesson-detail/lesson-detail.component";
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule, NbTimepickerModule,
  NbTreeGridModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LessonComponent,
    LessonListComponent,
    LessonDetailComponent,
    LessonViewComponent,
  ],
    imports: [
        CommonModule,
        LessonRoutingModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbIconModule,
        NbSelectModule,
        NbDatepickerModule,
        NbTimepickerModule,
        TranslateModule
    ]
})
export class LessonModule { }
