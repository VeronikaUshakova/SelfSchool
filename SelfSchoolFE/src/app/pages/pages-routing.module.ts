import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'teacher',
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'task',
        loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'pupil',
        loadChildren: () =>
          import('./pupil/pupil.module').then((m) => m.PupilModule),
      },
      {
        path: 'parent',
        loadChildren: () =>
          import('./parent/parent.module').then((m) => m.ParentModule),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('./material/material.module').then((m) => m.MaterialModule),
      },
      {
        path: 'lesson',
        loadChildren: () =>
          import('./lesson/lesson.module').then((m) => m.LessonModule),
      },
      {
        path: 'family',
        loadChildren: () =>
          import('./family/family.module').then((m) => m.FamilyModule),
      },
      {
        path: 'class',
        loadChildren: () =>
          import('./class-school/class-school.module').then(
            (m) => m.ClassSchoolModule
          ),
      },
      {
        path: 'answer',
        loadChildren: () =>
          import('./answer/answer.module').then((m) => m.AnswerModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'personal-cabinet',
        loadChildren: () =>
          import('./personal-cabinet/personal-cabinet.module').then((m) => m.PersonalCabinetModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule)
      },
      {
        path: 'chart',
        loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: 'grade',
        loadChildren: () => import('./grade/grade.module').then(m => m.GradeModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
