import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './overview/dashboard-overview.component';
import { AddClassComponent } from '../dashboard/class/addclass/addclass.component';
import { AddStudentComponent } from './student/addstudent/addstudent.component';
import { ListStudentsComponent } from '../dashboard/student/liststudents/liststudents.component';
import { AddTeacherComponent } from './teacher/addteacher/addteacher.component';
import { ListTeachersComponent } from './teacher/listteachers/listteachers.component';
import { ListClassesComponent } from './class/listclasses/listclasses.component';
import { EditstudentComponent } from './student/editstudent/editstudent.component';
import { DashboardLoginComponent } from './auth/login/dashboard-login.component';

const routes: Routes = [
  // Route for Login (no dashboard layout)
  {
    path: 'auth',
    children: [
      { path: 'login', component: DashboardLoginComponent }, // Login route
    ],
  },

  // Main dashboard routes with the default layout (Header, Sidebar, etc.)
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DashboardOverviewComponent },

      // Routes for Class
      {
        path: 'class',
        children: [
          { path: 'addclass', component: AddClassComponent },
          { path: 'listclasses', component: ListClassesComponent },
        ],
      },

      // Routes for Student
      {
        path: 'student',
        children: [
          { path: 'addstudent', component: AddStudentComponent },
          { path: 'liststudents', component: ListStudentsComponent },
          { path: 'editstudent', component: EditstudentComponent },
        ],
      },

      // Routes for Teacher
      {
        path: 'teacher',
        children: [
          { path: 'addteacher', component: AddTeacherComponent },
          { path: 'listteachers', component: ListTeachersComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
