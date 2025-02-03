import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/school-platform/student';

  constructor(private http: HttpClient) {}

  // Récupérer les étudiants par niveau
  getStudentsByNiveau(niveau: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?niveau=${niveau}`);
  }

  // Mettre à jour les statuts des étudiants
  updateStudentsStatus(updates: { id: string; status: string }[]): Observable<any[]> {
    return forkJoin(
      updates.map(update => 
        this.http.patch(`${this.apiUrl}/${update.id}`, update)
      )
    );
  }
 
  getAbsenceStats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/absence-stats`);
  }
  // Récupérer le total des étudiants
  getTotalStudents(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
