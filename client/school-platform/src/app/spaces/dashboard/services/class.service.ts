import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createClass(createClassDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, createClassDto);
  }

  deleteClass(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
