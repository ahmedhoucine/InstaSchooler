import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Matiere } from '../../components/utils/matiere.enum';  // Assuming Matiere is an Enum

@Component({
  selector: 'app-add-class',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss'],
})
export class AddClassComponent implements OnInit {
  classForm!: FormGroup;
  matiereOptions = Object.values(Matiere);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.classForm = this.fb.group({
      teachers: this.fb.array([]),
      subjects: this.fb.array([]),
    });

    this.addTeacher();
    this.addSubject();
  }

  get teachers(): FormArray {
    return this.classForm.get('teachers') as FormArray;
  }

  get subjects(): FormArray {
    return this.classForm.get('subjects') as FormArray;
  }

  addTeacher(): void {
    const teacherGroup = this.fb.group({
      teacher: ['', Validators.required],
      subject: ['', Validators.required],
    });

    this.teachers.push(teacherGroup);
  }

  removeTeacher(index: number): void {
    this.teachers.removeAt(index);
  }

  addSubject(): void {
    const subjectGroup = this.fb.group({
      subject: ['', Validators.required],
    });

    this.subjects.push(subjectGroup);
  }

  removeSubject(index: number): void {
    this.subjects.removeAt(index);
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      console.log(this.classForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
