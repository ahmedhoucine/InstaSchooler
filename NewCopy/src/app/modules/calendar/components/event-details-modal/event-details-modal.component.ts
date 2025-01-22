import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/events.service';

export interface EventData {
  id?: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

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
    private eventService: EventService
  ) {}

  onSave(): void {
    if (this.isLoading) {
      console.warn('Save action is already in progress.');
      return;
    }

    console.log('Saving event:', this.data);
    this.isLoading = true;

    const event: EventData = { ...this.data };

    if (event.id) {
      this.updateEvent(event);
    } else {
      this.createEvent(event);
    }
  }

  createEvent(event: EventData): void {
    this.eventService.createEvent(event).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.dialogRef.close(response); // Close the dialog with the event data
      },
      error: (error) => {
        console.error('Error creating event:', error);
      },
      complete: () => {
        this.isLoading = false; // Reset loading state
      }
    });
  }

  updateEvent(event: EventData): void {
    this.eventService.updateEvent(event.id!, event).subscribe({
      next: (response) => {
        console.log('Event updated successfully:', response);
        this.dialogRef.close(response); // Close the dialog with the updated event data
      },
      error: (error) => {
        console.error('Error updating event:', error);
      },
      complete: () => {
        this.isLoading = false; // Reset loading state
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(); // Close the dialog without any action
  }
}
