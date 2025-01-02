import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ListeComponent } from './liste/liste.component';
import { AddTaskComponent } from './add-task/add-task.component'; // Importer le nouveau composant
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';



  const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' }, // Redirection par défaut
    { path: 'courses', component: CoursesComponent },        // Page des cours
    { path: 'add-course', component: AddCourseComponent },   // Page pour ajouter un cours
    { path: 'liste', component: ListeComponent },            // Page Liste
    { path: 'add-task', component: AddTaskComponent }, // Route pour le formulaire d'ajout de tâche
    { path: 'notifications', component: NotificationComponent },
    { path: 'dashboards', component: DashboardComponent },



  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
