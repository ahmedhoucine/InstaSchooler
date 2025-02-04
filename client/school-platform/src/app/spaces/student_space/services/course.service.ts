import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  // Fetch courses for a specific user by userId
  getAvailableCourses(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available-courses`, {
      headers: { 'user-id': userId } // Optionally, pass the userId in headers
    });
  }
}
