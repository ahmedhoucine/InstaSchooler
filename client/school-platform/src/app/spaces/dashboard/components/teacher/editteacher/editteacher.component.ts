import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/spaces/dashboard/components/layout/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/spaces/dashboard/components/layout/confirmation-dialog/confirmation-dialog.component';
import { Matiere } from '../../utils/matiere.enum';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './editteacher.component.html',
  styleUrls: ['./editteacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  teacher: any;
  matiereOptions = Object.values(Matiere);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Assume the teacher to edit is passed via router state
    this.teacher = history.state.teacher;
    if (!this.teacher) {
      // If no teacher data is available, navigate back to the list
      this.router.navigate(['/dashboard/teacher/listteachers']);
      return;
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    this.teacherForm = this.fb.group({
      firstname: [this.teacher.firstname, Validators.required],
      lastName: [this.teacher.lastName, Validators.required],
      email: [this.teacher.email, [Validators.required, Validators.email]],
      phone: [this.teacher.phone, [Validators.required, Validators.pattern(/^([2459])[0-9]{7}$/)]],
      matiere: [this.teacher.matiere, Validators.required],
      isPaid: [this.teacher.isPaid, Validators.required]
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

    // Open a confirmation dialog before updating
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to update this teacher?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const teacherData = this.teacherForm.value;
        this.teacherService.updateTeacher(this.teacher._id, teacherData).subscribe({
          next: (response) => this.handleSuccess(response),
          error: (error) => this.handleError(error)
        });
      }
    });
  }

  private handleSuccess(response: any): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        firstname: response.firstname,
        lastname: response.lastName,
        actionType: 'updated',
        role: 'Teacher'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard/teacher/listteachers']);
    });
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred while updating the teacher.';

    if (error.status === 409) {
      errorMessage = error.error?.message || 'A teacher with this contact info already exists.';
    } else if (error.status === 400) {
      errorMessage = this.getValidationErrorMessage(error);
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private getValidationErrorMessage(error: any): string {
    if (error.error?.message) {
      return Array.isArray(error.error.message)
        ? error.error.message[0]
        : error.error.message;
    }
    return 'Invalid data provided.';
  }
}
