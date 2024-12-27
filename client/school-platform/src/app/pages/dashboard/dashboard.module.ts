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



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardOverviewComponent,
    AddClassComponent,
    AddStudentComponent,
    AddTeacherComponent,
    ListStudentsComponent,
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
  ]
})
export class DashboardModule { }
