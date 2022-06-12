import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule} from "@nebular/theme";
import {PagesRoutingModule} from "../pages/pages-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LoginComponent,
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        PagesRoutingModule,
        NbLayoutModule,
        ReactiveFormsModule,
        TranslateModule,
        NbIconModule,
    ]
})
export class LoginModule { }
