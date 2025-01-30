import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    console.log(headers)
  }

  addTask(task: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log(headers)
    return this.http.post(this.apiUrl, task, { headers });
  }

  getTasksForToday(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/today`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
