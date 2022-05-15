import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { MaterialListComponent } from "./material-list/material-list.component";
import { MaterialDetailComponent } from "./material-detail/material-detail.component";
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule } from "@nebular/theme";

@NgModule({
  declarations: [
    MaterialComponent,
    MaterialListComponent,
    MaterialDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class MaterialModule { }
