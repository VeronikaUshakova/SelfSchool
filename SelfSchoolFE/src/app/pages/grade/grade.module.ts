import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeComponent } from './grade.component';
import { NbButtonModule, NbCardModule } from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    GradeComponent
  ],
    imports: [
        CommonModule,
        GradeRoutingModule,
        NbCardModule,
        NbButtonModule,
        TranslateModule,
    ]
})
export class GradeModule { }
