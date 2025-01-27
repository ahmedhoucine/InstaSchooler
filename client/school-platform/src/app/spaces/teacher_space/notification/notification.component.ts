import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  tasksToday: any[] = []; // Liste des tâches du jour

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTodayTasks(); // Récupérer les tâches du jour au chargement
  }

  fetchTodayTasks(): void {
    this.taskService.getTasksForToday().subscribe(
      (tasks) => {
        this.tasksToday = tasks;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches du jour :', error);
      }
    );
  }
}
