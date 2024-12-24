import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface EventData {
  id?: string;
  title: string;
  description: string;
  startDate: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:mm
  endDate: string; // Format: YYYY-MM-DD
  endTime: string; // Format: HH:mm
}

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.css']
})
export class EventDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData
  ) {}

  // Close the dialog and return the updated data
  onSave(): void {
    console.log('Saving event:', this.data);
    const updatedEvent: EventData = {
      id: this.data.id,
      title: this.data.title,
      description: this.data.description,
      startDate: this.data.startDate,
      startTime: this.data.startTime,
      endDate: this.data.endDate,
      endTime: this.data.endTime
    };
    this.dialogRef.close(updatedEvent); // Close the modal and return the updated event
  }
  

  onClose(): void {
    this.dialogRef.close();
  }
}
