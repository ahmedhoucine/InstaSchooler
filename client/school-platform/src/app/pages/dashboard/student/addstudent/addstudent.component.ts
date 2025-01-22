import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: 'addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private router: Router,private fb: FormBuilder,private studentService :StudentService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      category: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    });
  }
  

  onSubmit(): void {


    const studentData = this.studentForm.value;

    console.log(studentData)

    this.studentService.createStudent(studentData).subscribe(
      (response) => {
        console.log('Student created successfully', response);
        this.router.navigate(['/dashboard/student/liststudents'] );

      },
      (error) => {
        console.error('Error creating student', error);
      }
    ); 

  }
}