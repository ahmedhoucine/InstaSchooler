import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing et composants
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';

// Angular Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';

@NgModule({
  declarations: [
    CalendarComponent,
    EventDetailsModalComponent, // Déclaration du composant modal
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,  MatDatepickerModule,
    MatNativeDateModule,HttpClientModule,FullCalendarModule
    
  ],
  exports: [
    CalendarComponent // Si besoin de l'utiliser ailleurs
  ]
})
export class CalendarModule { }
