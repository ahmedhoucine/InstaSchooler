import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardOverviewComponent } from './components/overview/dashboard-overview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
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
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlanningComponent } from './components/planning/planning.component';





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
    PlanningComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    // * MATERIAL IMPORTS
    MatInputModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
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
    PlanningComponent
  ],

})
export class DashboardModule { }
