import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import {RegistrationComponent} from "./registration.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
    NbButtonModule,
    NbCardModule,
    NbDatepickerModule, NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule
} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    RegistrationComponent
  ],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        ReactiveFormsModule,
        NbSelectModule,
        NbInputModule,
        NbButtonModule,
        NbCardModule,
        NbLayoutModule,
        NbDatepickerModule,
        TranslateModule,
        NbIconModule,
    ]
})
export class RegistrationModule { }
