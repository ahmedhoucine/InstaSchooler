import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-students',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: any[] = [];

  constructor(private studentService: StudentService,private router: Router) {}

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

    editStudent(student: any) {
      this.router.navigate(['/dashboard/student/editstudent'], { state: { student } });
    }  

  goToAddStudentPage(): void {
    this.router.navigate(['/dashboard/student/addstudent']);
  }
}
