import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/spaces/dashboard/services/student.service';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent {
  constructor(private router: Router,private fb: FormBuilder,private studentService :StudentService) {}
    studentForm!: FormGroup;
    student:any;

  ngOnInit(): void {
    this.student = history.state.student;


      this.studentForm = this.fb.group({
        firstname: [this.student.firstname, Validators.required],
      lastName: [this.student.lastName, Validators.required],
      dateOfBirth: [this.student.dateOfBirth, Validators.required],
      gender: [this.student.gender, Validators.required],
      nationality: [this.student.nationality, Validators.required],
      category: [this.student.category, Validators.required],
      email: [this.student.email, [Validators.required, Validators.email]],
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
      niveau: [this.student.niveau,Validators.required]

        });
      }

    onSubmit(): void {

    const studentData = this.studentForm.value;

    console.log(studentData)

    this.studentService.updateStudent(this.student._id,studentData).subscribe(
      (response) => {
        console.log('Student updated successfully', response);
        this.router.navigate(['/dashboard/student/liststudents'] );

      },
      (error) => {
        console.error('Error updating student', error);
      }
    );
  }
}
