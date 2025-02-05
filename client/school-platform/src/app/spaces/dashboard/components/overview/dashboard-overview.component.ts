import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  numberOfCourses: number = 0;
  numberOfStudents: number = 0;
  numberOfTeachers: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("Initial values: ", this.numberOfCourses, this.numberOfStudents, this.numberOfTeachers);
    this.loadCounts();
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

}
