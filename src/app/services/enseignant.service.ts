import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  private apiUrl = 'http://localhost:3000/teachers';

  constructor(private http: HttpClient) {}

  getEnseignantDetails(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  updateEnseignant(enseignant: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<any>(`${this.apiUrl}/me`, enseignant, { headers });
  }

  sendTicket(ticket: any): Observable<any> {
    return this.http.post('http://localhost:3000/tickets', ticket);
  }
}
