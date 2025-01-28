import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardStudent } from './core/guards-student/auth.guard';
import { AuthGuardDashboard } from './core/guards-dashboard/auth.guard';


const routes: Routes = [
  // Redirect the root path to the dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Lazy load the auth module
  //{ path: 'auth', loadChildren: () => import('./spaces/student_space/modules/auth/auth.module').then(m => m.AuthModule) },

  // Student routes protected by AuthGuard
  {
    path: 'student',
    loadChildren: () =>
      import('./spaces/student_space/components/layouts/student/student.module').then(
        m => m.StudentModule
      ),
    canActivate: [AuthGuardStudent],
  },

  // Student space routes
  {
    path: 'student-space',
    loadChildren: () =>
      import('./spaces/student_space/student.module').then(m => m.StudentModule)
  },

  // Teacher space routes
  {
    path: 'teacher-space',
    loadChildren: () =>
      import('./spaces/teacher_space/teacher.module').then(m => m.TeacherModule),
  },

  // Fallback route for unmatched paths
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
