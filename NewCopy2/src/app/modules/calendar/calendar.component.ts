import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { EventService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  pinnedDates: EventInput[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    events: [],
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: ''
    },
    select: this.handleDateRangeSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),  // Handler pour éditer les événements existants
    editable: true,
  };

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    
  }

  loadEvents(): void {
    console.log("helllllllllllllo",this.eventService);
    this.eventService.getAllEvents().subscribe(
      (events) => {
        console.log("events",events);
        
        
        this.pinnedDates = events.map((event) => ({
          id: event._id,  // Assurez-vous que l'event a un id unique
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          extendedProps: { description: event.description },
          color: this.getEventColor(event.endDate),
        }));

        console.log("pinnedDates", this.pinnedDates);
        

        this.calendarOptions.events = [...this.pinnedDates];
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getEventColor(endDate: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const eventEndDate = new Date(endDate);
    eventEndDate.setHours(0, 0, 0, 0);
  
    console.log('Today:', today);
    console.log('Event End Date:', eventEndDate);
  
    if (eventEndDate < today) {
      console.log('Color: Red');
      return 'rgba(255, 0, 0, 0.3)';
    } else {
      console.log('Color: Green');
      return 'rgba(61, 123, 61, 0.5)';
    }
  }
  


  handleDateRangeSelect(arg: any): void {
    const adjustedEndDate = new Date(arg.endStr);
    adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);

    const newEvent = {
      title: 'EVENT',
      description: '',
      startDate: arg.startStr,
      endDate: adjustedEndDate.toISOString().split('T')[0],
    };

    this.openEventModal(newEvent);
  }

  // Handler pour éditer un événement existant
  handleEventClick(arg: any): void {
    console.log("----arg",arg);
    
    const eventToEdit = {
      _id: arg.event.id,
      title: arg.event.title,
      description: arg.event.extendedProps.description,
      startDate: arg.event.startStr,
      endDate: arg.event.endStr,
    };

    this.openEventModal(eventToEdit);
  }

  openEventModal(eventData: any): void {
  const dialogRef = this.dialog.open(EventDetailsModalComponent, {
    width: '400px',
    data: eventData,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const updatedEvent: EventInput = {
        id: result._id,  // Conservez le même id pour mettre à jour l'événement
        title: result.title,
        start: result.startDate,
        end: result.endDate,
        extendedProps: {
          description: result.description,
        },
        color: this.getEventColor(result.endDate), // Recalcule la couleur
      };

      // Mise à jour de l'événement dans le tableau des événements
      const eventIndex = this.pinnedDates.findIndex(event => event.id === updatedEvent.id);
      if (eventIndex !== -1) {
        this.pinnedDates[eventIndex] = updatedEvent; // Remplace l'événement dans le tableau
      } else {
        this.pinnedDates.push(updatedEvent); // Ajoute un nouvel événement si nécessaire
      }

      // Rafraîchit les événements du calendrier
      this.calendarOptions.events = [...this.pinnedDates];
      this.cdRef.detectChanges(); // Assure la mise à jour immédiate de la vue
    }
  });
}

}
