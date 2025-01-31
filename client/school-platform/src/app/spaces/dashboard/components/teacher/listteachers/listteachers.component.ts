import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listteachers',
  templateUrl: './listteachers.component.html',
  styleUrls: ['./listteachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  teachers: any[] = [];

  constructor(private teacherService: TeacherService,private router: Router) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  // Get all teachers
  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        this.teachers = data;
      },
      (error) => {
        console.error('Error fetching teachers', error);
      }
    );
  }

  // Delete teacher by ID
  deleteTeacher(id: string): void {
    this.teacherService.deleteTeacher(id).subscribe(
      () => {
        this.teachers = this.teachers.filter(teacher => teacher.id !== id);
        this.getTeachers();

      },
      (error) => {
        console.error('Error deleting teacher', error);
      }
    );
  }
  // Add new teacher (navigate to add teacher page)
  goToAddTeacherPage(): void {
    this.router.navigate(['/dashboard/teacher/addteacher']);
  }
}
