import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ListeComponent } from './liste/liste.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { StudentComponent } from './student/student.component';
import { TeacherGuard } from '../../core/guards-teacher/teacher.guard'; 
const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: 'dashboards', component: DashboardComponent, canActivate: [TeacherGuard] },
      { path: 'courses', component: CoursesComponent, canActivate: [TeacherGuard] },
      { path: 'liste', component: ListeComponent, canActivate: [TeacherGuard] },
      { path: 'notifications', component: NotificationComponent, canActivate: [TeacherGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [TeacherGuard] },
      { path: 'add-course', component: AddCourseComponent, canActivate: [TeacherGuard] },
      { path: 'add-task', component: AddTaskComponent, canActivate: [TeacherGuard] },
      { path: 'teacher-register', component: TeacherRegisterComponent, canActivate: [TeacherGuard] },
      { path: 'student', component: StudentComponent, canActivate: [TeacherGuard] },
      { path: 'login', component: LoginComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
