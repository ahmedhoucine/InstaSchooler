import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(taskForm: any): void {
    if (taskForm.valid) {
      // Préparer les données à envoyer
      const taskData = {
        title: taskForm.value.title,
        description: taskForm.value.description,
        date: taskForm.value.date,
        createdAt: new Date()
      };

      // Envoi des données au backend
      this.http.post('http://localhost:5000/add-task', taskData).subscribe(
        (response) => {
          alert('Tâche ajoutée avec succès !');
          this.router.navigate(['/courses']); // Redirection après succès
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la tâche :', error);
          alert('Erreur lors de l\'ajout de la tâche.');
        }
      );
    }
  }
}
