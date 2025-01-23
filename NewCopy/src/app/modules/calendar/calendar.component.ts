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
    dateClick: this.handleDateClick.bind(this),
    select: this.handleDateRangeSelect.bind(this),
    editable: false,
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
    this.eventService.getAllEvents().subscribe(
      (events) => {
        this.pinnedDates = events.map((event) => ({
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          extendedProps: { description: event.description },
          color: this.getEventColor(event.endDate),
        }));

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

    return eventEndDate < today ? 'rgba(255, 0, 0, 0.3)' : 'rgba(61, 123, 61, 0.5)';
  }

  handleDateClick(arg: any): void {
    const newEvent = {
      title: 'EVENT',
      description: '',
      startDate: arg.dateStr,
      endDate: arg.dateStr,
    };

    this.openEventModal(newEvent);
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

  openEventModal(eventData: any): void {
    const dialogRef = this.dialog.open(EventDetailsModalComponent, {
      width: '400px',
      data: eventData,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed with result:', result); // Handle the result if needed
        // Optionally, reload events or update the UI
      }
    });
  }
  
}
