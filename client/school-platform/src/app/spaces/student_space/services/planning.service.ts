import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
  private apiUrl = 'http://localhost:3000/planning'; 

  constructor(private http: HttpClient) {}

  getPlanningForStudent(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}`).pipe(
      catchError(error => {
        console.error('Error fetching planning:', error);
        return throwError('There was an issue fetching your planning. Please try again later.');
      })
    );
  }
  
}
