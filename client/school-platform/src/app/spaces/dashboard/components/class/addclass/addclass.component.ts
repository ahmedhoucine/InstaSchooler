import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../../utils/matiere.enum';  // Assuming Matiere is an Enum
import { TeacherService } from '../../../services/teacher.service';
import { ClassService } from '../../../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss'],
})
export class AddClassComponent implements OnInit {
  classForm!: FormGroup;
  levels = [1, 2, 3, 4];
  matiereOptions = Object.values(Matiere);
  allTeachers: any[] = []; // Store all teachers
  teachers: any[] = []; // Filtered teachers based on selected subject

  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      niveau: [1, Validators.required],
      teacher: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });

    this.getAllTeachers();

    this.classForm.get('subject')?.valueChanges.subscribe((selectedSubject) => {
      this.fetchTeachersBySubject(selectedSubject);
    });
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (data) => {
        this.allTeachers = data;
        this.teachers = [...this.allTeachers];
        console.log("All teachers:", this.allTeachers);
      },
      (error) => {
        console.error('Error fetching teachers', error);
      }
    );
  }

  fetchTeachersBySubject(subject: string) {
    if (!subject) {
      this.teachers = [...this.allTeachers];
      return;
    }

    this.teachers = this.allTeachers.filter(teacher =>
      teacher.matiere && teacher.matiere.toLowerCase() === subject.toLowerCase()
    );
    console.log("Filtered Teachers:", this.teachers);
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      console.log("Class Data:", this.classForm.value);
      this.classService.createClass(this.classForm.value).subscribe(
        (response) => {
          console.log('Class created successfully:', response);
          this.router.navigate(['/dashboard/class/listclasses']);
        },
        (error) => {
          console.error('Error creating class', error);
        }
      );

    } else {
      console.log('Form is invalid');
    }
  }
}