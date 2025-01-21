import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  deleteStudent(index: number): void {
    const studentId = this.students[index]._id;
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        console.log(`Student at index ${index} deleted`);
        this.students.splice(index, 1);
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }

  editStudent(index: number): void {
    console.log(`Editing student at index ${index}`);
  }

  goToAddStudentPage(): void {
    console.log('Navigating to Add Student page...');
  }
}
