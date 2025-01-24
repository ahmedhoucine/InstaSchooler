import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(taskForm: any): void {
    if (taskForm.valid) {
      const taskData = {
        title: taskForm.value.title,
        description: taskForm.value.description,
        date: taskForm.value.date,
      };

      this.http.post('http://localhost:3000/tasks', taskData).subscribe(
        (response) => {
          alert('Tâche ajoutée avec succès !');
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la tâche :', error);
          alert('Erreur lors de l\'ajout de la tâche.');
        }
      );
    }
  }
}
