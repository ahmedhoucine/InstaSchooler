import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { EventDetailsModalComponent } from './components/event-details-modal/event-details-modal.component';
import { EventService } from 'src/app/core/services/events.service';
import { ProfileService } from 'src/app/core/services/profileEdit.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  pinnedDates: EventInput[] = [];
  profile = { userId: '' }; // To store the userId from the profile

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
    eventClick: this.handleEventClick.bind(this),
    editable: true,
  };

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private eventService: EventService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.fetchProfile();  // Fetch the profile on component init
  }

  // Fetch the profile to get the userId dynamically
  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data };
        this.loadEvents();  // After fetching profile, load events for the user
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  // Fetch events based on userId
  loadEvents(): void {
    const userId = this.profile.userId; // Get the userId from the profile

    if (!userId) {
      console.error('User ID is not available');
      return; // Stop execution if userId is not found
    }

    console.log("Fetching events for userId:", userId);
    
    this.eventService.getEventsByUserId(userId).subscribe(
      (events) => {
        console.log("events", events);
        this.pinnedDates = events.map((event) => ({
          id: event._id,
          title: event.title,
          start: event.startDate,
          end: event.endDate,
          extendedProps: { description: event.description },
          color: this.getEventColor(event.endDate),
        }));

        console.log("pinnedDates", this.pinnedDates);
        this.calendarOptions.events = [...this.pinnedDates];
        this.cdRef.detectChanges(); // Ensure the view is updated
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

  handleEventClick(arg: any): void {
    console.log("----arg", arg);

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
        if (result.action === 'delete') {
          // Delete the event from pinnedDates
          this.pinnedDates = this.pinnedDates.filter(event => event.id !== result.eventId);
          // Update the calendar events after deletion
          this.updateCalendarEvents();
        } else {
          const updatedEvent: EventInput = {
            id: result._id,
            title: result.title,
            start: result.startDate,
            end: result.endDate,
            extendedProps: {
              description: result.description,
            },
            color: this.getEventColor(result.endDate),
          };
  
          const eventIndex = this.pinnedDates.findIndex(event => event.id === updatedEvent.id);
          if (eventIndex !== -1) {
            this.pinnedDates[eventIndex] = updatedEvent;
          } else {
            this.pinnedDates.push(updatedEvent);
          }
  
          // Update the calendar events after update or addition
          this.updateCalendarEvents();
        }
      }
    });
  }
  
  // Helper method to update the calendar events
  updateCalendarEvents(): void {
    this.calendarOptions.events = [...this.pinnedDates];
    this.cdRef.detectChanges(); // Ensure the view is updated
  }
}  