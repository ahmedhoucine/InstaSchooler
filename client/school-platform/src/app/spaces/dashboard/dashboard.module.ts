import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './components/overview/dashboard-overview.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddClassComponent } from './components/class/addclass/addclass.component';
import { AddStudentComponent } from './components/student/addstudent/addstudent.component';
import { AddTeacherComponent } from './components/teacher/addteacher/addteacher.component';
import { ListStudentsComponent } from './components/student/liststudents/liststudents.component';
import { ListTeachersComponent } from './components/teacher/listteachers/listteachers.component';
import { ListClassesComponent } from './components/class/listclasses/listclasses.component';
import { EditstudentComponent } from './components/student/editstudent/editstudent.component';
import { DashboardLoginComponent } from './components/auth/login/dashboard-login.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOverviewComponent,
    AddClassComponent,
    AddStudentComponent,
    AddTeacherComponent,
    ListStudentsComponent,
    ListTeachersComponent,
    ListClassesComponent,
    EditstudentComponent,
    DashboardLoginComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    DashboardOverviewComponent,
    AddClassComponent,
    AddStudentComponent,
    AddTeacherComponent,
    ListStudentsComponent,
    ListTeachersComponent,
    ListClassesComponent,
    DashboardLoginComponent,
  ]
})
export class DashboardModule { }
