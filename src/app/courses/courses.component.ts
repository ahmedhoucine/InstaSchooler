import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  groupedCourses: { [key: string]: any[] } = {}; // Cours regroupés par niveau

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses(); // Charger les cours dès l'initialisation
  }

  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (response) => {
        // Regrouper les cours par niveau
        this.groupedCourses = response.reduce((groups: any, course: any) => {
          const niveau = course.niveau || 'Autre'; // Utiliser "Autre" si le niveau est manquant
          if (!groups[niveau]) {
            groups[niveau] = [];
          }
          groups[niveau].push(course);
          return groups;
        }, {});
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    );
  }

  // Helper pour obtenir les clés de groupedCourses
  getNiveaux(): string[] {
    return Object.keys(this.groupedCourses);
  }
}
