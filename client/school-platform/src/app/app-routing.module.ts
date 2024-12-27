import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardOverviewComponent}  from './pages/dashboard/overview/dashboard-overview.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddStudentComponent } from './pages/dashboard/student/addstudent/addstudent.component';
import { ListStudentsComponent } from './pages/dashboard/student/liststudents/liststudents.component';
import { AddTeacherComponent } from './pages/dashboard/teacher/addteacher/addteacher.component';
import { AddClassComponent } from './pages/dashboard/class/addclass/addclass.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'overview', component: DashboardOverviewComponent }, // New Overview Component
      { path: 'student/addstudent', component: AddStudentComponent },
      { path: 'student/liststudents', component: ListStudentsComponent },
      { path: 'teacher/addteacher', component: AddTeacherComponent },
      { path: 'class/addclass', component: AddClassComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
