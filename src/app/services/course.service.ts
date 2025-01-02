import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Ajouter un cours
  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-course`, course);
  }

  // Récupérer tous les cours
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }
  
}
