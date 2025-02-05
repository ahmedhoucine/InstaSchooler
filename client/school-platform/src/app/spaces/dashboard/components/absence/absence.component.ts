import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
})
export class AbsenceComponent implements OnInit {
  absenceStats: { niveau: number; absences: number }[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadAbsenceStats();
  }

  loadAbsenceStats(): void {
    this.studentService.getAbsenceStats().subscribe({
      next: (stats) => {
        this.absenceStats = stats;
      },
      error: (error) => {
        console.error('Error fetching absence stats:', error);
      },
    });
  }
}
