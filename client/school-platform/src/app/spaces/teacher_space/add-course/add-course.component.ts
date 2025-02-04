import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(courseForm: any): void {
    if (courseForm.valid) {
      const token = this.authService.getToken();
      if (!token) {
        alert('Vous devez être connecté pour ajouter un cours.');
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
          alert('Course added successfully  !');
          this.router.navigate(['/teacher-space/courses']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du cours :', error);
          alert('Error adding the course.');
        },
      });
    } else {
      alert(' Please fill in all required fields.');
    }
  }
}
