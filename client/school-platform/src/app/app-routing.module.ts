import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./spaces/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'teacher-space', loadChildren: () => import('./spaces/teacher_space/teacher.module').then(m => m.TeacherModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
