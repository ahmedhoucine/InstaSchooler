import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-listteachers',
  templateUrl: './listteachers.component.html',
  styleUrls: ['./listteachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  teachers: any[] = [];

  constructor(private teacherService: TeacherService) {}

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
      },
      (error) => {
        console.error('Error deleting teacher', error);
      }
    );
  }
}
