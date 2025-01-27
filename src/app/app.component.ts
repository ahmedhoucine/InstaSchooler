import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EnseignantService } from './services/enseignant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed: boolean = false; // Propriété pour gérer l'état du menu latéral
  enseignant: any = {
    profileImage: '',
    name: '',
  };
  isLoginPage: boolean = false; // Vérifie si l'utilisateur est sur la page de connexion

  constructor(private router: Router, private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.detectCurrentRoute();
    this.fetchEnseignantDetails();
  }

  // Détecte la route courante pour conditionner l'affichage du layout
  detectCurrentRoute(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  // Méthode pour basculer le menu latéral
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Récupérer les informations de l'enseignant connecté
  fetchEnseignantDetails(): void {
    this.enseignantService.getEnseignantDetails().subscribe(
      (data) => {
        this.enseignant.profileImage = data.profileImage || 'assets/default-profile.png';
        this.enseignant.name = data.name || 'Utilisateur';
      },
      (error) => {
        console.error('Erreur lors de la récupération des informations de l\'enseignant :', error);
      }
    );
  }

  // Méthode pour la déconnexion
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
