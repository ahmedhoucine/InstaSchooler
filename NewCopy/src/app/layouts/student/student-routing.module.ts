import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component'; // Main layout component

const routes: Routes = [
  {
    path: '',
    component: StudentComponent, // Main layout component
    
    children: [
      { path: 'dashboard', loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'planning', loadChildren: () => import('../../modules/planning/planning.module').then(m => m.PlanningModule) },

      { path: 'calendar', loadChildren: () => import('../../modules/calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'notifications', loadChildren: () => import('../../modules/notifications/notifications.module').then(m => m.NotificationsModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route
      { path: 'edit-profile', loadChildren: () => import('../../modules/edit-profile/edit-profil.module').then(m => m.EditProfileModule) }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentLayoutRoutingModule { }
