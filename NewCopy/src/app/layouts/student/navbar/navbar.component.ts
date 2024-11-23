import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  onLogout() {
    localStorage.removeItem('authToken'); // Clear token or session
    this.router.navigate(['/auth/login']); // Redirect to login
  }
}
