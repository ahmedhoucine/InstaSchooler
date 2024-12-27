import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './overview/dashboard-overview.component';
import { AddClassComponent } from '../dashboard/class/addclass/addclass.component';
import { AddStudentComponent } from './student/addstudent/addstudent.component';
import { ListStudentsComponent } from '../dashboard/student/liststudents/liststudents.component';
import { AddTeacherComponent } from './teacher/addteacher/addteacher.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'overview', component: DashboardOverviewComponent },

      // Routes for Class
      {
        path: 'class', children: [
          { path: 'addclass', component: AddClassComponent },
        ]
      },

      // Routes for Student
      {
        path: 'student', children: [
          { path: 'addstudent', component: AddStudentComponent },
          { path: 'liststudents', component: ListStudentsComponent },
        ]
      },

      // Routes for Teacher
      {
        path: 'teacher', children: [
          { path: 'addteacher', component: AddTeacherComponent },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
