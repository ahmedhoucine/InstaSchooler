import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(courseForm: any): void {
    if (courseForm.valid) {
      const formData = new FormData();
  
      // Ajout des données du formulaire
      formData.append('niveau', courseForm.value.niveau);
      formData.append('description', courseForm.value.description);
      formData.append('duration', courseForm.value.duration.toString()); // Convertir en chaîne de caractères
      formData.append('image', courseForm.value.image || '');
  
      // Ajout du fichier PDF
      const pdfInput = document.querySelector('input[name="pdf"]');
      if (pdfInput && pdfInput instanceof HTMLInputElement) {
        const pdfFile = pdfInput.files?.[0];
        if (pdfFile) {
          formData.append('pdf', pdfFile as Blob);
        }
      }
  
      // Envoi au backend
      this.http.post('http://localhost:3000/courses', formData).subscribe(
        (response) => {
          alert('Cours ajouté avec succès !');
          this.router.navigate(['/courses']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du cours :', error);
          alert('Erreur lors de l\'ajout du cours.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}  