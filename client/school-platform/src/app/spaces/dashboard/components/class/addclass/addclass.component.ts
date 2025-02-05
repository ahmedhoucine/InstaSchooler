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
      description: ['', Validators.required], // Added
      niveau: ['1', Validators.required], // Changed to string
      teacher: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]]
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
      teacher.matiere &&
      teacher.matiere.toLowerCase() === subject.toLowerCase()
    );

    // Reset teacher selection if no matching teachers
    if (this.teachers.length === 0) {
      this.classForm.get('teacher')?.reset();
    }
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      const formData = {
        ...this.classForm.value,
        niveau: this.classForm.value.niveau, // Now string
        duration: Number(this.classForm.value.duration),
        // Remove subject field
      };

      this.classService.createClass(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard/class/listclasses']);
        },
        error: (error) => {
          console.error('Error:', error.error);
          alert(`Error: ${error.error.message || 'Unknown error'}`);
        }
      });
    }
  }
}
