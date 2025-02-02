import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './join.component';
import { LoginComponent } from '../student_space/modules/auth/components/login/login.component';
import { DashboardLoginComponent } from '../dashboard/components/auth/login/dashboard-login.component';
// import { LoginComponent } from '../teacher_space/login/login.component';

const routes: Routes = [

{ path: '', component: JoinComponent },
  { path: 'student', component: LoginComponent },
{ path: 'admin', component:DashboardLoginComponent },
// { path: 'teacher', component: TeacherLoginComponent },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],})
export class JoinRoutingModule { }
