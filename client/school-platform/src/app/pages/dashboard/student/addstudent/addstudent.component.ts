import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: 'addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder,private studentService :StudentService) {}

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
      },
      (error) => {
        console.error('Error creating student', error);
      }
    ); 

    /*if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      //const studentData = this.studentForm.value;
      const studentData={
        "classe": "64d9f6f7c2f02c3e8a456b7f",
        "isPaid": true,
        "parentEmail": "parent@example.com",
        "parentPhone": "123-456-7890",
        "dateOfBirth": "2005-06-15",
        "gender": "Male",
        "nationality": "American",
        "category": "General",
        "admissionNo": "ADM12345",
        "joiningDate": "2023-09-01",
        "rollNo": "21",
        "parentFirstName": "John",
        "parentLastName": "Doe",
        "relation": "Father",
        "parentMobileNo": "987-654-3210",
        "address": "123 Main Street, Springfield, IL",
        "parentAddress": "123 Main Street, Springfield, IL",
        "firstname": "Alex",
        "lastName": "Smith",
        "email": "alexxxxx.smith@example.com",
        "password": "securepassword123",
        }
      

      this.studentService.createStudent(studentData).subscribe(
        (response) => {
          console.log('Student created successfully', response);
        },
        (error) => {
          console.error('Error creating student', error);
        }
      );    
    }*/
  }
}