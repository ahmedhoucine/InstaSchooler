import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.http.get('http://localhost:3000/tasks').subscribe(
      (response: any) => {
        this.tasks = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }
}
