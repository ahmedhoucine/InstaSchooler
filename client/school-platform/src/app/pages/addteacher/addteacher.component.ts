import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../components/utils/matiere.enum';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  matiereOptions = Object.values(Matiere);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      // Personal Information
      firstname: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

      // Password (auto-generated)
      password: ['', [Validators.required, Validators.minLength(8)]],

      // Matiere (Subject)
      matiere: ['', [Validators.required]],

      // Employment Information
      isPaid: [false, [Validators.required]],

      // Contact Information
      phone: [
        '',
        [Validators.required, Validators.pattern(/^([2459])[0-9]{7}$/)],
      ],

      // Classes (Array of class IDs)
      classes: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      console.log(this.teacherForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
