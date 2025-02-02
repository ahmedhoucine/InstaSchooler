import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { ListeComponent } from './liste/liste.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component'; // Assurez-vous que ce chemin est correct
import { AddCourseComponent } from './add-course/add-course.component'; // Ajouter le chemin vers AddCourseComponent
import { AddTaskComponent } from './add-task/add-task.component'; // Ajouter le chemin vers AddTaskComponent
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component'; // Ajouter le chemin vers AddTaskComponent
import { StudentComponent } from './student/student.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: 'dashboards', component: DashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'liste', component: ListeComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'login', component: LoginComponent }, // Route pour le login
      { path: 'add-course', component: AddCourseComponent }, // Route pour ajouter un cours
      { path: 'add-task', component: AddTaskComponent }, // Route pour ajouter une tâche
      { path: 'teacher-register', component: TeacherRegisterComponent }, // Route pour ajouter une tâche
      { path: 'student', component: StudentComponent }, // Route pour ajouter une tâche


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
