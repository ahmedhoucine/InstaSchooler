import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './overview/dashboard-overview.component';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddClassComponent } from './class/addclass/addclass.component';
import { AddStudentComponent } from './student/addstudent/addstudent.component';
import { AddTeacherComponent } from './teacher/addteacher/addteacher.component';
import { ListStudentsComponent } from './student/liststudents/liststudents.component';
import { ListTeachersComponent } from './teacher/listteachers/listteachers.component';
import { ListClassesComponent } from './class/listclasses/listclasses.component';
import { EditstudentComponent } from './student/editstudent/editstudent.component';
import { DashboardLoginComponent } from './auth/login/dashboard-login.component';



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
