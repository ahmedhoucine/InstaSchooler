import { Router } from '@angular/router';
import { AuthService } from 'src/app/spaces/dashboard/services/auth.service';  // Ensure this path is correct

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent {
//   isSidebarHidden = false;
//
//   constructor(
//     private router: Router,
//     private authService: AuthService  // Inject AuthService
//   ) {}
//
//   toggleSidebar() {
//     this.isSidebarHidden = !this.isSidebarHidden;
//   }
//
//   navigateToStudents() {
//     this.router.navigate(['dashboard/student/liststudents']);
//   }
//
//   navigateToTeachers() {
//     this.router.navigate(['dashboard/teacher/listteachers']);
//   }
//
//   navigateToDashboard() {
//     this.router.navigate(['dashboard/overview']);
//   }
//
//   navigateToClasses() {
//     this.router.navigate(['dashboard/class/listclasses']);
//   }
//
//   logout() {
//     this.authService.logout();
//     this.router.navigate(['dashboard/auth/login']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/spaces/dashboard/services/sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class SidebarComponent implements OnInit {


  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;


  constructor(private sidebarService: SidebarService,
              private router: Router,
              private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      console.log(isVisible)
      this.isSidebarVisible = isVisible;
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }


  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }


  selectDashboard() {
    this.isDashboardSelected = true;
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

  navigateToClasses() {
    this.router.navigate(['dashboard/class/listclasses']);
  }

  navigateToPlanning() {
    this.router.navigate(['dashboard/planning/addplanning']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['dashboard/auth/login']);
  }

}
