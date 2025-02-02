import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  numberOfCourses: number = 0; // Nombre de cours
  numberOfStudents: number = 0; // Nombre total d'étudiants
  absenceStats: { niveau: number; absences: number }[] = []; // Statistiques des absences
  remainingTeachingDays: number = 0; // Jours d'enseignement restants
  totalTeachingDays: number = 200; // Total des jours d'enseignement

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchCourseCount();
    this.fetchStudentCount();
    this.loadAbsenceStats();
    this.calculateRemainingTeachingDays();
  }

  fetchCourseCount(): void {
    const token = this.authService.getToken();
    if (token) {
      this.courseService.getCourseCountByTeacher(token).subscribe({
        next: (count) => {
          this.numberOfCourses = count;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du nombre de cours :', error);
        },
      });
    }
  }

  fetchStudentCount(): void {
    this.studentService.getTotalStudents().subscribe({
      next: (data) => {
        this.numberOfStudents = data.count;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du nombre d\'étudiants :', error);
      },
    });
  }

  loadAbsenceStats(): void {
    this.studentService.getAbsenceStats().subscribe({
      next: (stats) => {
        this.absenceStats = stats;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des statistiques :', error);
      },
    });
  }

  calculateRemainingTeachingDays(): void {
    const startDate = new Date(new Date().getFullYear(), 1, 1); // 1er février
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + this.totalTeachingDays); // Date de fin

    const today = new Date();

    if (today < startDate) {
      this.remainingTeachingDays = this.totalTeachingDays; // Avant le début de l'année scolaire
    } else if (today > endDate) {
      this.remainingTeachingDays = 0; // Après la fin de l'année scolaire
    } else {
      const elapsedDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      this.remainingTeachingDays = Math.max(this.totalTeachingDays - elapsedDays, 0);
    }
  }
}
