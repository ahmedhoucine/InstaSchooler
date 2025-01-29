import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../utils/matiere.enum';
import { TeacherService } from 'src/app/spaces/dashboard/services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  matiereOptions = Object.values(Matiere);

  constructor(private router: Router,private fb: FormBuilder,private teacherservice : TeacherService) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      // Personal Information
      firstname: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],



      // Matiere (Subject)
      matiere: ['', [Validators.required]],

      // Employment Information
      isPaid: [false, [Validators.required]],

      // Contact Information
      phone: [
        '',
        [Validators.required, Validators.pattern(/^([2459])[0-9]{7}$/)],
      ],


    });
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      console.log(this.teacherForm.value);
      const teachertData = this.teacherForm.value;

      this.teacherservice.createTeacher(teachertData).subscribe(
        (response) => {
          console.log('Student created successfully', response);
          this.router.navigate(['/dashboard/teacher/listteachers'] );

        },
        (error) => {
          console.error('Error creating student', error);
        }
      );

    } else {
      console.log('Form is invalid');
      console.log(this.teacherForm.controls);

    }

  }
}
