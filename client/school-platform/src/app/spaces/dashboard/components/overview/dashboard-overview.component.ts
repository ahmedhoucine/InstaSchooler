import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { jsPDF } from 'jspdf';
import { ReportService } from 'src/app/spaces/dashboard/services/report.service';
import { StudentService } from 'src/app/spaces/dashboard/services/student.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  numberOfCourses: number = 0;
  numberOfStudents: number = 0;
  numberOfTeachers: number = 0;
  absenceStats: { niveau: number; absences: number }[] = [];

  constructor(
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef,
    private reportService: ReportService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    console.log("Initial values: ", this.numberOfCourses, this.numberOfStudents, this.numberOfTeachers);
    this.loadCounts();
    this.loadAbsenceStats();
    this.reportService.generateReport$.subscribe(() => {
      this.generateReport();
    });
  }

  loadCounts(): void {
    this.dashboardService.getCourseCount().subscribe({
      next: (count: number) => {
        this.numberOfCourses = count;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => console.error('Error fetching courses:', error),
    });

    this.dashboardService.getStudentCount().subscribe({
      next: (count: number) => {
        this.numberOfStudents = count;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => console.error('Error fetching students:', error),
    });

    this.dashboardService.getTeacherCount().subscribe({
      next: (count: number) => {
        this.numberOfTeachers = count;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => console.error('Error fetching teachers:', error),
    });
  }

  loadAbsenceStats(): void {
    this.studentService.getAbsenceStats().subscribe({
      next: (stats: { niveau: number; absences: number }[]) => {
        this.absenceStats = stats;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: any) => console.error('Error fetching absence stats:', error),
    });
  }

  generateReport(): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Dashboard Overview Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Total Students: ${this.numberOfStudents}`, 14, 30);
    doc.text(`Total Teachers: ${this.numberOfTeachers}`, 14, 40);
    doc.text(`Total Courses: ${this.numberOfCourses}`, 14, 50);
    doc.text('Absence Tracking:', 14, 60);
    this.absenceStats.forEach((stat, index) => {
      doc.text(`Level: ${stat.niveau} - Absences: ${stat.absences}`, 14, 70 + (index * 10));
    });
    doc.save('dashboard-overview-report.pdf');
  }
}
