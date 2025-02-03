import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards-student/auth.guard';

const routes: Routes = [
  // Redirect the root path to the dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Lazy load the auth module

   { path: 'auth', loadChildren: () => import('./spaces/student_space/modules/auth/auth.module').then(m => m.AuthModule) },

  // Student routes protected by AuthGuard
  {
    path: 'student',
    loadChildren: () => import('./spaces/student_space/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard]
  },

  // Lazy load the dashboard module
  { path: 'dashboard', loadChildren: () => import('./spaces/dashboard/dashboard.module').then(m => m.DashboardModule) },

  // Teacher space routes
// Student routes protected by AuthGuard

{
  path: 'teacher-space',
  loadChildren: () => import('./spaces/teacher_space/teacher.module').then(m => m.TeacherModule),
},
{ path: 'join', loadChildren: () => import('./spaces/join/join.module').then(m => m.JoinModule) },

  // Fallback route for unmatched paths
  { path: '**', redirectTo: 'dashboard/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
