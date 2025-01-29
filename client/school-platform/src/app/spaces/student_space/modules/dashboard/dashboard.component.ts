import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profileEdit.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: any[] = []; // Liste des cours
  profile = { userId: '' }; // Pour stocker l'ID de l'utilisateur

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private courseService: CourseService, // Injection du service de cours
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchProfile();  // Récupérer le profil au démarrage du composant
  }

  // Récupérer dynamiquement l'ID de l'utilisateur à partir du ProfileService
  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data }; // Mettre à jour le profil avec les données reçues
        this.loadCourses();  // Charger les cours après avoir récupéré le profil
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur', error);
      }
    );
  }

  // Charger les cours pour l'utilisateur
  loadCourses(): void {
    const userId = this.profile.userId; // Récupérer l'ID de l'utilisateur

    if (!userId) {
      console.error('L\'ID de l\'utilisateur n\'est pas disponible');
      return; // Arrêter l'exécution si l'ID n'est pas trouvé
    }

    console.log("Récupération des cours pour l'utilisateur:", userId);

    this.courseService.getCoursesByUserId(userId).subscribe(
      (data) => {
        this.courses = data; // Stocker les cours dans la variable
        console.log('Cours récupérés:', this.courses);
        this.cdRef.detectChanges(); // Assurer que la vue est mise à jour
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }

 // Fonction pour ouvrir le PDF local dans un nouvel onglet
viewPdf(pdfUrl: string): void {
 
    window.open(pdfUrl, '_blank');
  }
}

