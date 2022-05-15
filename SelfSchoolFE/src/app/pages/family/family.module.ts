import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyComponent } from './family.component';
import {FamilyListComponent} from "./family-list/family-list.component";
import {FamilyDetailComponent} from "./family-detail/family-detail.component";
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule} from "@nebular/theme";


@NgModule({
  declarations: [
    FamilyComponent,
    FamilyListComponent,
    FamilyDetailComponent,
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class FamilyModule { }
