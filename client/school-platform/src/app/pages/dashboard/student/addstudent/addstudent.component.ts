import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-student',
  templateUrl: 'addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder, private studentService:StudentService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      studentName: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      category: ['', Validators.required],
      contactDetails: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        mobileNo: ['', Validators.required],
        photo: [''],
        address: [''],
      }),
      officialDetails: this.fb.group({
        admissionNo: ['', Validators.required],
        joiningDate: ['', Validators.required],
        rollNo: ['', Validators.required],
      }),
      parentDetails: this.fb.group({
        parentName: this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
        }),
        relation: ['', Validators.required],
        occupation: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        mobileNo: [''],
        parentAddress: [''],
      }),
    });
  }
  

  onSubmit(): void {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      const studentData = this.studentForm.value;

      this.studentService.createStudent(studentData).subscribe(
        (response) => {
          console.log('Student created successfully', response);
          this.toastr.success('Student created successfully!');
        },
        (error) => {
          console.error('Error creating student', error);
          this.toastr.error('Error creating student!');
        }
      );
    } 
  }
  }

