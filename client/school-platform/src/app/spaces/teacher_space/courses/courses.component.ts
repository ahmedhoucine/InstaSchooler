import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  groupedCourses: { [key: string]: any[] } = {};

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    const token = this.authService.getToken();
    if (!token) {
      alert('Vous devez être connecté pour voir vos cours.');
      return;
    }

    this.courseService.getCoursesByTeacher(token).subscribe({
      next: (response) => {
        this.groupedCourses = response.reduce((groups: any, course: any) => {
          const niveau = course.niveau || 'Autre';
          if (!groups[niveau]) {
            groups[niveau] = [];
          }
          groups[niveau].push(course);
          return groups;
        }, {});
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des cours :', error);
      },
    });
  }

  getNiveaux(): string[] {
    return Object.keys(this.groupedCourses);
  }
}
