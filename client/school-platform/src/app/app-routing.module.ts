import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddStudentComponent } from './pages/addstudent/addstudent.component';
import { AddTeacherComponent } from './pages/addteacher/addteacher.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'student/add-student', component: AddStudentComponent },
  { path: 'teacher/add-teacher', component: AddTeacherComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
