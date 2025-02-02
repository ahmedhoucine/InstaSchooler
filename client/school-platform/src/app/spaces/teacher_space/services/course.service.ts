import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addCourse(course: any, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/courses`, course, { headers });
  }

  getCoursesByTeacher(token: string): Observable<any[]> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/courses/by-teacher`, { headers });
  }

  getCourseCountByTeacher(token: string): Observable<number> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{ count: number }>(`${this.apiUrl}/courses/count`, { headers })
      .pipe(map((response: { count: number }) => response.count));
  }

  deleteCourse(courseId: string): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<void>(`${this.apiUrl}/courses/${courseId}`, { headers });
  }
}
