import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';  // Import plugins used
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  pinnedDates: EventInput[] = [];  // Array to hold all pinned events

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    events: this.pinnedDates,  // Calendar events array
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: ''
    },
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),  // Handle event click to edit
  };

  constructor(private dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  // Handle new event creation when clicking on a date
  handleDateClick(arg: any): void {
    const newEvent = {
      title: '',
      description: '',
      location: '',
      start: arg.dateStr,  // Starting date of the event
      end: arg.dateStr,    // Ending date of the event (initially same as start)
    };

    const dialogRef = this.dialog.open(EventDetailsModalComponent, {
      width: '400px',
      data: newEvent  // Pass the new event object to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const event: EventInput = {
          title: result.title,
          description: result.description,
          location: result.location,
          start: result.start,  // Make sure to pass the proper start date
          end: result.end,      // Pass the correct end date
          id: this.generateEventId(),  // Generate a unique event ID
          color: '#3788d8'  // Default color for the event
        };
        this.pinnedDates.push(event);  // Add the event to the calendar
        this.cdRef.detectChanges();  // Trigger change detection to update the view
      }
    });
  }

  // Handle event edit when an existing event is clicked
  handleEventClick(arg: any): void {
    const event = arg.event;
    const dialogRef = this.dialog.open(EventDetailsModalComponent, {
      width: '400px',
      data: {
        id: event.id,
        title: event.title,
        description: event.extendedProps.description,
        location: event.extendedProps.location,
        start: event.start.toISOString().substr(0, 16),  // Format date to match input type
        end: event.end.toISOString().substr(0, 16)     // Format date to match input type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        event.setProp('title', result.title);  // Update the event title
        event.setExtendedProp('description', result.description);  // Update event description
        event.setExtendedProp('location', result.location);  // Update event location
        event.setStart(result.start);  // Update event start date
        event.setEnd(result.end);      // Update event end date
      }
    });
  }

  // Generate a unique event ID (for new events)
  generateEventId(): string {
    return 'event-' + Math.random().toString(36).substr(2, 9);
  }
}
