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
    this.router.navigate(['dashboard/student/liststudents']);
  }

  navigateToTeachers() {
    this.router.navigate(['dashboard/teacher/listteachers']);
  }

  navigateToDashboard() {
    this.router.navigate(['dashboard/overview']);
  }
}
