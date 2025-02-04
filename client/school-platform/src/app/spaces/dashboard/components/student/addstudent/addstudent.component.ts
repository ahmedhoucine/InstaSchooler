import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/spaces/dashboard/services/student.service';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/spaces/dashboard/components/layout/error-dialog/error-dialog.component';


@Component({
  selector: 'app-add-student',
  templateUrl: 'addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddStudentComponent {
  studentForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      category: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      address: [''],
      admissionNo: ['', Validators.required],
      joiningDate: ['', Validators.required],
      rollNo: ['', Validators.required],
      class: ['', Validators.required],
      isPaid: [false, Validators.required],
      parentFirstName: ['', Validators.required],
      parentLastName: ['', Validators.required],
      relation: ['', Validators.required],
      parentEmail: ['', [Validators.required, Validators.email]],
      parentPhone: [''],
      parentMobileNo: [''],
      parentAddress: [''],
      niveau: ['',Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Please fill all required fields' },
        panelClass: 'custom-dialog-panel'
      });
      return;
    }
    this.studentService.createStudent(this.studentForm.value).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
  }

  private handleSuccess(response: any): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        firstname: response.firstname,
        lastname: response.lastName,
        actionType: 'created'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard/student/liststudents']);
    });
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred while creating the student.';

    if (this.studentForm.get('email')?.errors?.['email'] ||
      this.studentForm.get('email')?.errors?.['pattern']) {
      errorMessage = 'Please enter a valid email address';
    }
    else if (error.status === 409) {
      errorMessage = 'A student with this email already exists.';
    }
    else if (error.status === 400) {
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

  get email() {
    return this.studentForm.get('email');
  }

}
