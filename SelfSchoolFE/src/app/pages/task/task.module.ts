import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import {
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule, NbTimepickerModule,
  NbTreeGridModule
} from "@nebular/theme";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import { TaskViewComponent } from './task-view/task-view.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskViewComponent,
  ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbIconModule,
        ReactiveFormsModule,
        NbDatepickerModule,
        NbTimepickerModule,
        TranslateModule
    ]
})
export class TaskModule { }
