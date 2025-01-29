import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  // Récupérer les étudiants par niveau
  getStudentsByNiveau(niveau: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?niveau=${niveau}`);
  }

  // Mettre à jour les statuts des étudiants
  updateStudentsStatus(updates: { id: string; status: string }[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status`, updates);
  }
  
 
  getAbsenceStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/absence-stats`);
  }
  // Récupérer le total des étudiants
  getTotalStudents(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
  }
}
