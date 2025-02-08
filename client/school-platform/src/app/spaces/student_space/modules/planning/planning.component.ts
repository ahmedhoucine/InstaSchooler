import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlanningService } from '../../services/planning.service';  
import { ProfileService } from '../../services/profileEdit.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  planning: any;  
  profile$: Observable<any>;  
  
  constructor(
    private planningService: PlanningService,  
    private profileService: ProfileService,  
    private cdRef: ChangeDetectorRef  
  ) {
    this.profile$ = this.profileService.profile$; 
  }

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if (profile && profile.userId) {
        this.loadPlanning(profile.userId);  
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
        this.planning = data;  
        console.log('Planning retrieved:', this.planning);
        this.cdRef.detectChanges(); 
      },
      (error) => {
        console.error('Error fetching planning', error);
      }
    );
  }
}
