import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = `${environment.apiUrl}/teachers`;

  constructor(private http: HttpClient) {}

  // Get all teachers
  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-teachers`);
  }

  // Get a single teacher by ID
  getTeacherById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new teacher
  createTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-teacher`, teacher);
  }

  // Update a teacher by ID
  updateTeacher(id: string, teacher: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, teacher);
  }

  // Delete a teacher by ID
  deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
