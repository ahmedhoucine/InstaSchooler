import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private apiUrl = `${environment.apiUrl}/auth`; // Base URL for backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { Authorization: string } {
    const token = localStorage.getItem('token') || '';
    return { Authorization: `Bearer ${token}` };
  }

  // Fetch the current user's profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update profile
  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${profile.userId}`, profile, {
      headers: this.getAuthHeaders(),
    });
  }

  // Validate current password
  validateCurrentPassword(currentPassword: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/validate-password`,
      { currentPassword },
      { headers: this.getAuthHeaders() }
    );
  }
}
