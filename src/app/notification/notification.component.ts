import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  tasksToday: any[] = []; // Liste des tâches du jour

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTodayTasks(); // Récupérer les tâches du jour au chargement
  }

  // Méthode pour récupérer uniquement les tâches du jour
  fetchTodayTasks(): void {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    this.http.get<any[]>('http://localhost:5000/tasks').subscribe(
      (tasks) => {
        this.tasksToday = tasks.filter((task) => task.date === today);
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }
}
