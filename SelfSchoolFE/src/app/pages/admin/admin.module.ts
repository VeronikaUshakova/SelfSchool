import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from "./admin.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {AdminDetailComponent} from "./admin-detail/admin-detail.component";
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
    AdminComponent,
    AdminListComponent,
    AdminDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbIconModule,
  ]
})
export class AdminModule { }
