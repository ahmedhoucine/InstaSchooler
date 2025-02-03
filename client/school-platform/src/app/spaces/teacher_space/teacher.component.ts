import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'teacher-root',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = false; // Gère l'état de la barre latérale
  isLoginPage: boolean = false; // Indique si l'utilisateur est sur la page de connexion
  private routerSubscription!: Subscription; // Pour gérer l'abonnement

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Abonnez-vous aux événements du routeur pour détecter les changements d'URL
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie si l'URL actuelle correspond à la page de connexion
        this.isLoginPage = event.url.includes('/login');
      }
    });
  }

  // Bascule l'état de la barre latérale (ouverte/repliée)
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  
}
