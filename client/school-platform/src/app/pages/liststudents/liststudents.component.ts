import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';  // Import the service

@Component({
  selector: 'app-list-students',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents(); // Fetch students when the component initializes
  }

  // Fetch students from the backend
  getStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data; // Assign the response data to the students array
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  // Delete student by ID
  deleteStudent(index: number): void {
    const studentId = this.students[index].id; // Assuming students have an 'id' property
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        console.log(`Student at index ${index} deleted`);
        this.students.splice(index, 1); // Remove the student from the list
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }

  // Optional: Edit student logic
  editStudent(index: number): void {
    console.log(`Editing student at index ${index}`);
  }

  // Navigate to add student page (you can use routing here)
  goToAddStudentPage(): void {
    console.log('Navigating to Add Student page...');
  }
}
