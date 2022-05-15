import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { ParentListComponent } from "./parent-list/parent-list.component";
import { ParentDetailComponent } from "./parent-detail/parent-detail.component";
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbTreeGridModule} from "@nebular/theme";


@NgModule({
  declarations: [
    ParentComponent,
    ParentListComponent,
    ParentDetailComponent,
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
  ]
})
export class ParentModule { }
