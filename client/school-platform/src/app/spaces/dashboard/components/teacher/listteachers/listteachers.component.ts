import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/spaces/dashboard/components/layout/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';

@Component({
  selector: 'app-listteachers',
  templateUrl: './listteachers.component.html',
  styleUrls: ['./listteachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  teachers: any[] = [];

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog for modals
  ) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  // Get all teachers
  getTeachers(): void {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        this.teachers = data.map(teacher => ({
          ...teacher,
          profilePicture: teacher.profilePicture || 'assets/images/default-profile-picture.png'
        }));
      },
      (error) => {
        console.error('Error fetching teachers', error);
      }
    );
  }

  // Navigate to Edit Teacher Page
  editTeacher(teacher: any) {
    this.router.navigate(['/dashboard/teacher/editteacher'], { state: { teacher } });
  }

  // Delete teacher by ID with confirmation dialog
  deleteTeacher(id: string): void {
    const teacher = this.teachers.find(t => t._id === id);

    // Open confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${teacher.firstname} ${teacher.lastName}?` }
    });

    // Handle confirmation response
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.teacherService.deleteTeacher(id).subscribe(
          () => {
            console.log(`Teacher ${teacher.firstname} ${teacher.lastname} deleted`);
            this.teachers = this.teachers.filter(teacher => teacher._id !== id);

            // Show success dialog
            this.dialog.open(SuccessDialogComponent, {
              data: {
                firstname: teacher.firstname,
                lastname: teacher.lastname,
                actionType: 'deleted'
              }
            });
          },
          (error) => {
            console.error('Error deleting teacher', error);
          }
        );
      }
    });
  }

  // Navigate to Add Teacher Page
  goToAddTeacherPage(): void {
    this.router.navigate(['/dashboard/teacher/addteacher']);
  }
}
