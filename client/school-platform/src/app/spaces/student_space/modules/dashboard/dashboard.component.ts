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
  profile = { userId: '' }; // Stocker l'ID de l'utilisateur

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private courseService: CourseService, // Injection du service de cours
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchProfile();  // Récupérer le profil au démarrage du composant
  }

  fetchProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data }; 
        this.loadCourses();  // Charger les cours après avoir récupéré le profil
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur', error);
      }
    );
  }

  loadCourses(): void {
    const userId = this.profile.userId; 

    if (!userId) {
      console.error('L\'ID de l\'utilisateur n\'est pas disponible');
      return;
    }

    console.log("Récupération des cours pour l'utilisateur:", userId);

    this.courseService.getCoursesByUserId(userId).subscribe(
      (data) => {
        this.courses = data.map(course => ({ ...course, expanded: false })); // Ajout de la propriété "expanded"
        console.log('Cours récupérés:', this.courses);
        this.cdRef.detectChanges(); 
      },
      (error) => {
        
        console.error('Erreur lors de la récupération des cours', error);
      }
    );
  }
  toggleDescription(course: any): void {
    course.expanded = !course.expanded; // Alterne l'état "expanded"
  
  }
  
  viewPdf(pdfUrl: string): void {
    window.open(pdfUrl, '_blank');
  }
}
