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

  constructor(private teacherservice: TeacherService, private fb: FormBuilder,private classservice:ClassService,private router: Router) {}

  ngOnInit(): void {
    this.classForm = this.fb.group({
      description: ['', Validators.required],
      subject: ['', Validators.required],
      niveau: [1, Validators.required],
      teacher: ['', Validators.required],
      duration: ['', Validators.required]
    });

    this.getAllTeachers();

    this.classForm.get('subject')?.valueChanges.subscribe((selectedSubject) => {
      this.fetchTeachersBySubject(selectedSubject);
    });
  }

  getAllTeachers() {
    this.teacherservice.getAllTeachers().subscribe(
      (data) => {
        this.allTeachers = data; // Store all teachers initially
        this.teachers = []; // Reset teachers until subject is selected
        console.log(data);
      },
      (error) => {
        console.error('Error fetching teachers', error);
      }
    );
  }

  fetchTeachersBySubject(subject: string) {
    if (!subject) {
      this.teachers = []; // Reset if no subject is selected
      return;
    }

    // Filter teachers based on selected subject
    this.teachers = this.allTeachers.filter((teacher) =>
      teacher.matiere.includes(subject)
    );
    console.log(this.teachers)
  }

  onSubmit(): void {
    if (this.classForm.valid) {
        console.log(this.classForm.value)
        this.classservice.createClass(this.classForm.value).subscribe(
        (response) => {
          console.log('class created successfully', response);
          this.router.navigate(['/dashboard/class/listclasses'] );
  
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
