import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: any[] = []; // Liste des cours

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourses(); // Récupérer les cours au chargement
  }

  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (response) => {
        this.courses = response; // Mise à jour de la liste des cours
       
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours :', error);

      }
    );
  }
}

