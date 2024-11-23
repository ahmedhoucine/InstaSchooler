import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component'; // Main layout component
import { EditProfileComponent } from 'src/app/modules/edit-profile/edit-profil.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent, // Main layout component
    
    children: [
      { path: 'dashboard', loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'calendar', loadChildren: () => import('../../modules/calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'notifications', loadChildren: () => import('../../modules/notifications/notifications.module').then(m => m.NotificationsModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
      { path: 'edit-profile', component: EditProfileComponent } // Edit Profile

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLayoutRoutingModule { }
