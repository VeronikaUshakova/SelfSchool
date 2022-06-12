import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import {CalendarModule} from "angular-calendar";
import {NbButtonGroupModule, NbButtonModule, NbCardModule} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ScheduleComponent
  ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        CalendarModule,
        NbButtonModule,
        NbCardModule,
        NbButtonGroupModule,
        TranslateModule,
    ]
})
export class ScheduleModule { }
