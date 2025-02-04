import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/spaces/dashboard/services/student.service';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/spaces/dashboard/components/layout/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/spaces/dashboard/components/layout/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent {
  studentForm!: FormGroup;
  student: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.student = history.state.student;
    this.initializeForm();
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      firstname: [this.student.firstname, Validators.required],
      lastName: [this.student.lastName, Validators.required],
      dateOfBirth: [this.student.dateOfBirth, Validators.required],
      gender: [this.student.gender, Validators.required],
      nationality: [this.student.nationality, Validators.required],
      category: [this.student.category, Validators.required],
      email: [this.student.email, [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      address: [this.student.address],
      admissionNo: [this.student.admissionNo, Validators.required],
      joiningDate: [this.student.joiningDate, Validators.required],
      rollNo: [this.student.rollNo, Validators.required],
      class: [this.student.class, Validators.required],
      isPaid: [this.student.isPaid, Validators.required],
      parentFirstName: [this.student.parentFirstName, Validators.required],
      parentLastName: [this.student.parentLastName, Validators.required],
      relation: [this.student.relation, Validators.required],
      parentEmail: [this.student.parentEmail, [Validators.required, Validators.email]],
      parentPhone: [this.student.parentPhone],
      parentMobileNo: [this.student.parentMobileNo],
      parentAddress: [this.student.parentAddress],
      niveau: [this.student.niveau, Validators.required]
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

    // Open confirmation dialog with a custom message
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to update this student?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const studentData = this.studentForm.value;
        this.studentService.updateStudent(this.student._id, studentData).subscribe({
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
        actionType: 'updated'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/dashboard/student/liststudents']);
    });
  }

  private handleError(error: any): void {
    let errorMessage = 'An error occurred while updating the student.';

    if (this.studentForm.get('email')?.errors?.['email']) {
      errorMessage = 'Please enter a valid email address';
    } else if (error.status === 409) {
      errorMessage = 'A student with this email already exists.';
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

  get email() {
    return this.studentForm.get('email');
  }
}
