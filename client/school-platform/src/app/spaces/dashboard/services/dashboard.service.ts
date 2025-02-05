import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper method to add Authorization header with token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get the total course count
  getCourseCount(): Observable<number> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/courses/total-count`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Course count response:', response)),  // Log the full response
      map((response: { count: any }) => response.count)  // Extract only the count value
    );
  }

  // Get the total student count
  getStudentCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/school-platform/student/count`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Student count response:', response))  // Log the full response
    );
  }

  // Get the total teacher count
  getTeacherCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/teachers/count`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Teacher count response:', response))  // Log the full response
    );
  }
}
