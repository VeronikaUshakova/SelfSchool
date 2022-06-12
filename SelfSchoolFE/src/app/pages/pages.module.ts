import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbIconModule,
  NbTreeGridModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbTimepickerModule,
  NbAccordionModule, NbButtonGroupModule,
} from '@nebular/theme';
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "angular-calendar";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    PagesComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NbLayoutModule,
        NbSidebarModule,
        NbMenuModule,
        NbIconModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbIconModule,
        NbDatepickerModule,
        NbTimepickerModule,
        NbAccordionModule,
        NbButtonGroupModule,
        CalendarModule,
        NgxChartsModule,
        TranslateModule,
    ]
})
export class PagesModule { }
