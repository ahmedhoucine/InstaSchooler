import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  numberOfCourses: number = 0; // Nombre de cours
  numberOfStudents: number = 0; // Nombre total d'étudiants
  absenceStats: { niveau: number; absences: number }[] = []; // Statistiques des absences

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.fetchCourseCount(); // Charger le nombre de cours
    this.fetchStudentCount(); // Charger le nombre d'étudiants
    this.loadAbsenceStats(); // Charger les statistiques des absences
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

  fetchStudentCount(): void {
    this.studentService.getTotalStudents().subscribe(
      (data) => {
        this.numberOfStudents = data.count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre d\'étudiants :', error);
      }
    );
  }

  loadAbsenceStats(): void {
    this.studentService.getAbsenceStats().subscribe(
      (stats) => {
        this.absenceStats = stats;
      },
      (error) => {
        console.error('Erreur lors du chargement des statistiques :', error);
      }
    );
  }
}
