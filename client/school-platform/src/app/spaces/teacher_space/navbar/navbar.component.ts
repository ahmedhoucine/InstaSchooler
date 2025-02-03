import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  enseignant = {
    profileImage: './assets/images/images1.png',
    name: 'Utilisateur',
  };

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
