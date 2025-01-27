import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(taskForm: any): void {
    if (taskForm.valid) {
      const taskData = {
        title: taskForm.value.title,
        description: taskForm.value.description,
        date: taskForm.value.date,
      };

      this.taskService.addTask(taskData).subscribe(
        () => {
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
