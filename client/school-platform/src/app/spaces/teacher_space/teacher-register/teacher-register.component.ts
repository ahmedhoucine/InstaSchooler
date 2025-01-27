import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.scss'],
})
export class TeacherRegisterComponent {
  teacher = {
    email: '',
    password: '',
    firstname: '',
    lastName: '',
    matiere: '',
  };

  constructor(private http: HttpClient) {}

  registerTeacher() {
    this.http.post('http://localhost:3000/teachers/register', this.teacher).subscribe({
      next: (response) => {
        alert('Enseignant enregistré avec succès');
      },
      error: (error) => {
        alert('Erreur : ' + error.error.message);
      },
    });
  }
}
