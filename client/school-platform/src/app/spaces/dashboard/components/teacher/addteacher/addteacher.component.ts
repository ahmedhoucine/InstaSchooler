import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../utils/matiere.enum';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/spaces/dashboard/components/layout/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  matiereOptions = Object.values(Matiere);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      // Personal Information
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^([2459])[0-9]{7}$/)],
      ],
      // Subject (Matiere)
      matiere: ['', Validators.required],
      // Employment Information
      isPaid: [false, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.teacherForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Please fill all required fields' },
        panelClass: 'custom-dialog-panel'
      });
      return;
    }

    this.teacherService.createTeacher(this.teacherForm.value).subscribe({
      next: (response: any) => this.handleSuccess(response),
      error: (error: any) => this.handleError(error)
    });
  }

  private handleSuccess(response: any): void {
    // The teacher service returns the created teacher document directly
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        firstname: response.firstname,
        lastname: response.lastName,
        actionType: 'created',
        role: 'Teacher'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard/teacher/listteachers']);
    });
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred while creating the teacher.';

    if (error.status === 409) {
      // Use the error message returned by the backend if available
      errorMessage = error.error?.message || 'A teacher with this contact info already exists.';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Invalid data provided.';
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
