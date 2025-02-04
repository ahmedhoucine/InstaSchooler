import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit(courseForm: any): void {
    if (courseForm.valid) {
      const token = this.authService.getToken();
      if (!token) {
        this.alertService.showAlert('You must be logged in to add a course.', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('title', courseForm.value.title);
      formData.append('niveau', courseForm.value.niveau);
      formData.append('description', courseForm.value.description);
      formData.append('duration', courseForm.value.duration.toString());
      formData.append('image', courseForm.value.image || '');

      const pdfInput = document.querySelector('input[name="pdf"]') as HTMLInputElement;
      if (pdfInput?.files?.[0]) {
        formData.append('pdf', pdfInput.files[0]);
      }

      this.http.post('http://localhost:3000/courses', formData, {
        headers: { Authorization: `Bearer ${token}` },
      }).subscribe({
        next: () => {
          this.alertService.showAlert('Course added successfully!', 'success');
          this.router.navigate(['/teacher-space/courses']);
        },
        error: (error) => {
          console.error('Error adding course:', error);
          this.alertService.showAlert('Error adding the course.', 'error');
        },
      });
    } else {
      this.alertService.showAlert('Please fill in all required fields.', 'error');
    }
  }
}
