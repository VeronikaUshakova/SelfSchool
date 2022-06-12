import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { PersonalCabinetComponent } from './personal-cabinet.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    PersonalCabinetComponent
  ],
    imports: [
        CommonModule,
        PersonalCabinetRoutingModule,
        NbAccordionModule,
        NbCardModule,
        ReactiveFormsModule,
        NbDatepickerModule,
        NbSelectModule,
        NbInputModule,
        NbButtonModule,
        TranslateModule
    ]
})
export class PersonalCabinetModule { }
