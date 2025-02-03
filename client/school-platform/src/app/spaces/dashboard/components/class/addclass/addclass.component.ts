import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../../../services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss'],
})
export class AddClassComponent implements OnInit {
  courseForm!: FormGroup;
  levels = [1, 2, 3, 4];

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.courseForm = this.fb.group({
      niveau: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const courseData = {
      ...this.courseForm.value,
      pdf: 'https://example.com/temporary.pdf'
    };

    this.classService.createClass(courseData).subscribe({
      next: () => this.router.navigate(['/dashboard/class/listclasses']),
      error: (err) => console.error('Error creating course', err)
    });
  }
}
