import { Component, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/events.service';
import { EventData } from './event.model';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.css']
})
export class EventDetailsModalComponent {
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<EventDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
    private eventService: EventService,
    private ngZone: NgZone // Inject Angular's NgZone service
  ) {}

  onSave(): void {
    if (this.isLoading) {
      console.warn('Save action is already in progress.');
      return;
    }

    

    this.isLoading = true;

    // Immediately close the dialog in the Angular zone
    this.ngZone.run(() => {
      this.dialogRef.close(this.data); // Close with the event data
    });

    console.log("hello", this.data);
    

    // If the event has an ID, update it; otherwise, create a new event
    if (this.data._id) {
      console.log("helloo ---",this.data);
      
      this.eventService.updateEvent(this.data._id, this.data).subscribe({
        next: (response) => {
          console.log('Event updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating event:', error);
        },
        complete: () => {
          this.isLoading = false; // Reset loading state
        }
      });
    } else {
      // Create new event if no ID is present
      this.eventService.createEvent(this.data).subscribe({
        next: (response) => {
          console.log('Event created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating event:', error);
        },
        complete: () => {
          this.isLoading = false; // Reset loading state
        }
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog immediately
  }
}
