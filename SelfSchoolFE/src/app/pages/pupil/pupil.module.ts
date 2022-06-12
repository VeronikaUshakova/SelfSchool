import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PupilRoutingModule } from './pupil-routing.module';
import { PupilComponent } from './pupil.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule
} from "@nebular/theme";
import { PupilListComponent } from "./pupil-list/pupil-list.component";
import { PupilDetailComponent } from "./pupil-detail/pupil-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    PupilComponent,
    PupilListComponent,
    PupilDetailComponent,
  ],
    imports: [
        CommonModule,
        PupilRoutingModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbDatepickerModule,
        NbIconModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class PupilModule { }
