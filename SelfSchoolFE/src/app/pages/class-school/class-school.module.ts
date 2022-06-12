import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassSchoolRoutingModule } from './class-school-routing.module';
import { ClassSchoolComponent } from './class-school.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule
} from "@nebular/theme";
import { ClassSchoolListComponent } from "./class-school-list/class-school-list.component";
import { ClassSchoolDetailComponent } from "./class-school-detail/class-school-detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ClassSchoolPupilComponent } from './class-school-pupil/class-school-pupil.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ClassSchoolComponent,
    ClassSchoolListComponent,
    ClassSchoolDetailComponent,
    ClassSchoolPupilComponent,
  ],
    imports: [
        CommonModule,
        ClassSchoolRoutingModule,
        NbTreeGridModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbSelectModule,
        NbIconModule,
        ReactiveFormsModule,
        TranslateModule,
    ]
})
export class ClassSchoolModule { }
