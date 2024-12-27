import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiUrl = `${environment.apiUrl}/school-platform/classes`;

  constructor(private http: HttpClient) {}

  // Get all classes
  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-classes`);
  }

  // Get class by ID
  getClassById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new class
  createClass(createClassDto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-class`, createClassDto);
  }

  // Update class by ID
  updateClass(id: string, updateClassDto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updateClassDto);
  }

  // Delete class by ID
  deleteClass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
