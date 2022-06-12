import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbTreeGridModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbToastrModule,
  NbDatepickerModule,
  NbTimepickerModule,
  NbAccordionModule,
  NbButtonGroupModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  AnswerService,
  IAnswerService
} from "./services/answer.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AdminService, IAdminService} from "./services/admin.service";
import {ClassSchoolService, IClassSchoolService} from "./services/class-school.service";
import {FamilyService, IFamilyService} from "./services/family.service";
import {ILessonService, LessonService} from "./services/lesson.service";
import {IMaterialService, MaterialService} from "./services/material.service";
import {IParentService, ParentService} from "./services/parent.service";
import {IPupilService, PupilService} from "./services/pupil.service";
import {ITaskLessonService, TaskLessonService} from "./services/task-lesson.service";
import {ITeacherService, TeacherService} from "./services/teacher.service";
import {ReactiveFormsModule} from "@angular/forms";
import {IToastrService, ToastrService} from "./services/toastr.service";
import {ExcelService, IExcelService} from "./services/excel.service";
import {LoginModule} from "./login/login.module";
import {ILoginService, LoginService} from "./services/login.service";
import {IUserService, UserService} from "./services/user.service";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    LoginModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbInputModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbAccordionModule,
    NbButtonGroupModule,
    NgxChartsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: IAnswerService, useClass: AnswerService },
    { provide: IAdminService, useClass: AdminService },
    { provide: IClassSchoolService, useClass: ClassSchoolService },
    { provide: IFamilyService, useClass: FamilyService },
    { provide: ILessonService, useClass: LessonService },
    { provide: IMaterialService, useClass: MaterialService },
    { provide: IParentService, useClass: ParentService },
    { provide: IPupilService, useClass: PupilService },
    { provide: ITaskLessonService, useClass: TaskLessonService },
    { provide: ITeacherService, useClass: TeacherService },
    { provide: IToastrService, useClass: ToastrService },
    { provide: IExcelService, useClass: ExcelService },
    { provide: ILoginService, useClass: LoginService },
    { provide: IUserService, useClass: UserService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
