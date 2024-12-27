import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-cards',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
})
export class FeatureCardsComponent {
  constructor(private router: Router) {}

  navigateToAddStudent(): void {
    this.router.navigate(['/dashboard/student/addstudent']);
  }

  navigateToAddTeacher(): void {
    this.router.navigate(['/dashboard/teacher/addteacher']);
  }

  navigateToAddClass(): void {
    this.router.navigate(['/dashboard/class/addclass']);
  }
}
