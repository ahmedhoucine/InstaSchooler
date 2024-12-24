import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { StudentComponent } from './student.component'; // Main layout component
import { StudentLayoutRoutingModule } from './student-routing.module'; // Routing module for student layout
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule } from 'src/app/modules/calendar/calendar.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    MainContentComponent,
    StudentComponent,
  ],
  imports: [
    CommonModule,
    StudentLayoutRoutingModule,
    MatSidenavModule, // Angular Material sidenav
    MatListModule, // Material list items
    MatIconModule, // Material icons
    MatButtonModule, // Ma // Import routing for student layout
    CalendarModule,  MatFormFieldModule,
    MatInputModule,
    FormsModule, // 
  ],
  exports: [NavbarComponent, SidebarComponent, MainContentComponent],
})
export class StudentModule { }
