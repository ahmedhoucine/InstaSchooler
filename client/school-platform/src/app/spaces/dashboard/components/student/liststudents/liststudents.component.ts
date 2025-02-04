import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/spaces/dashboard/services/student.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/spaces/dashboard/components/layout/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';

@Component({
  selector: 'app-list-students',
  templateUrl: './liststudents.component.html',
  styleUrls: ['./liststudents.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: any[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data.map(student => ({
          ...student,
          profilePicture: student.profilePicture || 'assets/images/default-profile-picture.png'
        }));
      },
      (error) => console.error(error)
    );
  }

  deleteStudent(index: number): void {
    const student = this.students[index];

    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${student.firstname} ${student.lastName}?` }
    });

    // Handle dialog result
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Proceed with deletion
        this.studentService.deleteStudent(student._id).subscribe(
          () => {
            console.log(`Student ${student.firstname} ${student.lastname} deleted`);
            this.students.splice(index, 1);

            // Show success dialog
            this.dialog.open(SuccessDialogComponent, {
              data: {
                firstname: student.firstname,
                lastname: student.lastname,
                actionType: 'deleted'
              }
            });
          },
          (error) => {
            console.error('Error deleting student', error);
          }
        );
      }
    });
  }

  editStudent(student: any) {
    this.router.navigate(['/dashboard/student/editstudent'], { state: { student } });
  }

  goToAddStudentPage(): void {
    this.router.navigate(['/dashboard/student/addstudent']);
  }
}
