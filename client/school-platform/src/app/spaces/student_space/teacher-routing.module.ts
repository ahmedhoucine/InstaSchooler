import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards-dashboard/auth.guard'; // Adjust the import path according to your project structure

const routes: Routes = [
  //{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'student',
    loadChildren: () => import('./components/layouts/student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard], // Add this line to protect the route with AuthGuard

     // Protect the route with AuthGuard
  },  { path: '**', redirectTo: 'auth/login' }, // Default route if no match

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
