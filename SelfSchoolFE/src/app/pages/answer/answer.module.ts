import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerComponent } from './answer.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule} from '@nebular/theme';
import {AnswerListComponent} from "./answer-list/answer-list.component";
import {AnswerDetailComponent} from "./answer-detail/answer-detail.component";


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
  ]
})
export class AnswerModule { }
