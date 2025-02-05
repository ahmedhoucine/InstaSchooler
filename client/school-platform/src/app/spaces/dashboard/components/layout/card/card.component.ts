import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() icon: string = '';
  @Input() count: number = 0;
  @Input() title: string = '';

  animatedCount: number = 0;
  animationState: string = 'start';
  buttonIcon: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setButtonIcon();
    this.animateCount();  // Trigger animation on init
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['count']) {
      this.animatedCount = 0;  // Reset animation
      this.animateCount();      // Trigger animation again
    }
  }

  animateCount() {
    const duration = 2000; // Animation duration in milliseconds
    const increment = Math.ceil(this.count / (duration / 50)); // Increment value

    const interval = setInterval(() => {
      this.animatedCount += increment;
      if (this.animatedCount >= this.count) {
        this.animatedCount = this.count;
        clearInterval(interval);
        this.animationState = 'end'; // Trigger animation end state
      }
    }, 50);
  }

  // Set the button icon based on the card title
  setButtonIcon() {
    switch (this.title) {
      case 'Total Students':
        this.buttonIcon = 'person_add';
        break;
      case 'Total Teachers':
        this.buttonIcon = 'person_add';
        break;
      case 'Total Courses':
        this.buttonIcon = 'school';
        break;
      case 'Unpaid Students':
        this.buttonIcon = 'warning';
        break;
      default:
        this.buttonIcon = 'more_vert';
    }
  }

  // Handle button click based on the card title
  handleButtonClick() {
    switch (this.title) {
      case 'Total Students':
        this.router.navigate(['/dashboard/student/addstudent']);
        break;
      case 'Total Teachers':
        this.router.navigate(['/dashboard/teacher/addteacher']);
        break;
      case 'Total Courses':
        this.router.navigate(['/dashboard/class/addclass']);
        break;
      case 'Unpaid Students':
        // this.router.navigate(['/dashboard/student/unpaid-students']);
        console.log("Redirecting to warning form");
        break;
      default:
        console.log('No action defined for this card.');
    }
  }
}
