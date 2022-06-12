import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import {NbCardModule, NbInputModule} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    SubjectComponent
  ],
    imports: [
        CommonModule,
        SubjectRoutingModule,
        NbCardModule,
        NbInputModule,
        TranslateModule,
    ]
})
export class SubjectModule { }
