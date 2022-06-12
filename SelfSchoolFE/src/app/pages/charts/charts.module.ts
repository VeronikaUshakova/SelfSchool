import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import {NbCardModule} from "@nebular/theme";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ChartsComponent
  ],
    imports: [
        CommonModule,
        ChartsRoutingModule,
        NbCardModule,
        NgxChartsModule,
        TranslateModule,
    ]
})
export class ChartsModule { }
