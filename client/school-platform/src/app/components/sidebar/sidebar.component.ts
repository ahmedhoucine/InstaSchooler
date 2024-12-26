import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarHidden = false;

  constructor(private router: Router) {}
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateToStudents() {
    this.router.navigate(['/student/list']);
  }
}
