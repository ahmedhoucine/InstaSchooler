import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed: boolean = false; // Propriété pour gérer l'état du menu latéral

  constructor(private router: Router) {}

  // Méthode pour basculer le menu latéral
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Vérifie si l'utilisateur est sur le tableau de bord
  isDashboard(): boolean {
    return this.router.url === '/dashboard';
  }
}
