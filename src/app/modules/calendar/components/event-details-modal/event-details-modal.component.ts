import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/core/services/events.service';
import { ProfileService } from 'src/app/core/services/profileEdit.service';
import { EventData } from './event.model';

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

  onClose(): void {
    this.dialogRef.close(); // Close the dialog immediately
  }
}
