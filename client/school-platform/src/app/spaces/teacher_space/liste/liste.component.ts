import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
        console.log('Tâche supprimée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la tâche :', error);
      }
    );
  }
}
