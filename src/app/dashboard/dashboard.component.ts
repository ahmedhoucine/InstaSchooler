import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  numberOfCourses: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchCourseCount(); // Récupérer le nombre de cours
  }

  fetchCourseCount(): void {
    this.courseService.getCourseCount().subscribe(
      (count) => {
        this.numberOfCourses = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre de cours :', error);
      }
    );
  }
}
