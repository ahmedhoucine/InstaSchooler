import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  tasks: any[] = []; // Liste des tâches

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks(); // Charger les tâches lors de l'initialisation
  }

  fetchTasks(): void {
    this.http.get('http://localhost:5000/tasks').subscribe(
      (response: any) => {
        this.tasks = response; // Met à jour la liste des tâches
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }
}
