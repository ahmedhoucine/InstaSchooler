import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlanningService } from '../../services/planning.service';  // Assuming you have this service to handle planning
import { ProfileService } from '../../services/profileEdit.service'; // If you need the profile information
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  planning: any;  // Store the planning object
  profile$: Observable<any>;  // Profile observable
  
  constructor(
    private planningService: PlanningService,  // Inject planning service
    private profileService: ProfileService,  // Inject profile service (if needed)
    private cdRef: ChangeDetectorRef  // Change detection to update the view
  ) {
    this.profile$ = this.profileService.profile$;  // Observable for profile
  }

  ngOnInit(): void {
    // Subscribe to the profile observable to get the student info
    this.profile$.subscribe(profile => {
      if (profile && profile.userId) {
        this.loadPlanning(profile.userId);  // Fetch planning using studentId once the profile is available
      }
    });
  }

  loadPlanning(studentId: string): void {
    if (!studentId) {
      console.error('Student ID is not available');
      return;
    }

    console.log('Fetching planning for student:', studentId);

    this.planningService.getPlanningForStudent(studentId).subscribe(
      (data) => {
        this.planning = data;  // Store the fetched planning
        console.log('Planning retrieved:', this.planning);
        this.cdRef.detectChanges();  // Trigger view update
      },
      (error) => {
        console.error('Error fetching planning', error);
        // Optionally, show a user-friendly message to the user
      }
    );
  }
}
