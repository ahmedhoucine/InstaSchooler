import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './join.component';

const routes: Routes = [

{ path: '', component: JoinComponent },
// { path: 'admin', component: AdminJoinComponent },
// { path: 'teacher', component: TeacherJoinComponent },
// { path: 'student', component: StudentJoinComponent },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],})
export class JoinRoutingModule { }
