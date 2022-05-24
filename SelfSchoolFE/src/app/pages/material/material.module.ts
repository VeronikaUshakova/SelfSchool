import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';
import { MaterialListComponent } from "./material-list/material-list.component";
import { MaterialDetailComponent } from "./material-detail/material-detail.component";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTreeGridModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";

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
    ReactiveFormsModule,
    NbIconModule
  ]
})
export class MaterialModule { }
