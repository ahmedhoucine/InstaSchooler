import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/auth'; // Base URL for backend

  constructor(private http: HttpClient) {}

  // Fetch the current user's profile
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  // Update profile
  updateProfile(profile: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/profile/${profile.userId}`, profile, {
      headers,
    });
  }

  // Validate current password
  validateCurrentPassword(currentPassword: string): Observable<boolean> {
    const token = localStorage.getItem('token'); // Retrieve token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<boolean>(`${this.apiUrl}/validate-password`, { currentPassword }, { headers });
  }
}
