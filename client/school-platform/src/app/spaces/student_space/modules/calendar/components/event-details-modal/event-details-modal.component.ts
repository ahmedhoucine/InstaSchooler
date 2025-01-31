import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EventData } from './event.model';
import { ProfileService } from 'src/app/spaces/student_space/services/profileEdit.service';
import { EventService } from 'src/app/spaces/student_space/services/events.service';

@Component({
  selector: 'app-event-details-modal',
  templateUrl: './event-details-modal.component.html',
  styleUrls: ['./event-details-modal.component.css']
})
export class EventDetailsModalComponent  implements OnInit {
  profile = {
    userId: '',
    username: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    profilePicture: ''};

  isLoading = false;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<EventDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventData,
    private eventService: EventService,
    private ngZone: NgZone ,// Inject Angular's NgZone service,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    console.log('EditProfileComponent loaded');
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data };
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
      }
    );
  }

  onSave(): void {
    this.data.studentId=this.profile.userId;
    console.log("tessssttt",this);
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
  onDelete(): void {
    if (this.data._id) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.eventService.deleteEvent(this.data._id).subscribe(
          () => {
            // Close the modal and send a delete action with the eventId back to the parent
            this.dialogRef.close({ action: 'delete', eventId: this.data._id });
          },
          (error) => {
            console.error('Error deleting event:', error);
          }
        );
      }
    }
  }
  
  onClose(): void {
    this.dialogRef.close(); // Close the dialog immediately
  }
}
