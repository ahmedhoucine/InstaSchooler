import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Ensure you import the plugins you use
import interactionPlugin from '@fullcalendar/interaction'; // For dateClick and other interactions

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // Array to store pinned dates
  pinnedDates: EventInput[] = [];

  // Calendar configuration
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin], // Include required plugins
    initialView: 'dayGridMonth',
    selectable: true, // Allow selecting cells
    events: this.pinnedDates, // Load pinned events
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: ''
    },
    // Define dateClick handler within calendarOptions
    dateClick: this.handleDateClick.bind(this), // Bind the dateClick event
  };

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  handleDateClick(arg: any): void {
    const date = arg.dateStr;

    // Check if the date is already pinned
    const isPinned = this.pinnedDates.find(event => event.start === date);

    if (!isPinned) {
      this.pinnedDates.push({
        title: '📌',
        start: date,
        backgroundColor: 'transparent', // Remove background color (optional)
        borderColor: 'transparent', // Remove border (optional)
      });
    } else {
      // Remove the pinned date if it's already pinned
      this.pinnedDates = this.pinnedDates.filter(event => event.start !== date);
    }

    // Manually trigger change detection to update the calendar
    this.cdRef.detectChanges();
  }
}
