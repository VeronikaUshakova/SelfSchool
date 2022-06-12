import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerComponent } from './answer.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule
} from '@nebular/theme';
import {AnswerListComponent} from "./answer-list/answer-list.component";
import {AnswerDetailComponent} from "./answer-detail/answer-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    AnswerComponent,
    AnswerListComponent,
    AnswerDetailComponent,
  ],
    imports: [
        CommonModule,
        AnswerRoutingModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbIconModule,
        TranslateModule
    ]
})
export class AnswerModule { }
