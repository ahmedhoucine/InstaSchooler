import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListeComponent } from './liste/liste.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component'; // Importer le composant Settings
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';





const routes: Routes = [
  { path: '', redirectTo: 'dashboards', pathMatch: 'full' }, // Redirection par défaut vers le tableau de bord
  { path: 'courses', component: CoursesComponent }, // Page des cours
  { path: 'add-course', component: AddCourseComponent }, // Page pour ajouter un cours
  { path: 'liste', component: ListeComponent }, // Page Liste
  { path: 'add-task', component: AddTaskComponent }, // Route pour le formulaire d'ajout de tâche
  { path: 'notifications', component: NotificationComponent }, // Page des notifications
  { path: 'dashboards', component: DashboardComponent }, // Tableau de bord
  { path: 'settings', component: SettingsComponent }, // Page des paramètres
  { path: 'students', component: StudentComponent }, // Route pour le composant étudiant
  { path: 'login', component: LoginComponent },
  { path: 'register-teacher', component: TeacherRegisterComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
