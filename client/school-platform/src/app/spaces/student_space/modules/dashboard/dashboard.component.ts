import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../../services/profileEdit.service';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: any[] = []; // Liste des cours
  profile$: Observable<any>; // Profile observable

  constructor(
    private profileService: ProfileService,
    private courseService: CourseService, // Injection du service de cours
    private cdRef: ChangeDetectorRef
  ) {
    this.profile$ = this.profileService.profile$; // Observable du profil
  }

  ngOnInit(): void {
    // Ici, on attend que profile$ soit disponible et ensuite on charge les cours
    this.profile$.subscribe(profile => {
      if (profile && profile.userId) {
        this.loadCourses(profile.userId); // Charger les cours avec userId une fois le profil disponible
      }
    });
  }

  loadCourses(userId: string): void {
    if (!userId) {
      console.error('L\'ID de l\'utilisateur n\'est pas disponible');
      return;
    }

    console.log("Récupération des cours pour l'utilisateur:", userId);

    this.courseService.getCoursesByUserId(userId).subscribe(
      (data) => {
        this.courses = data.map(course => ({ ...course, expanded: false })); // Ajout de la propriété "expanded"
        console.log('Cours récupérés:', this.courses);
        this.cdRef.detectChanges(); // Assurer que la vue est mise à jour
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
