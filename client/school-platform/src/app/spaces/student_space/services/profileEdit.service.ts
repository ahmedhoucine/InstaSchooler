import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/auth`; // Base URL for backend

  private profileSubject = new BehaviorSubject<any>(null); // Stocke les données du profil
  profile$ = this.profileSubject.asObservable(); // Observable exposé pour les composants

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { Authorization: string } {
    const token = localStorage.getItem('token') || '';
    return { Authorization: `Bearer ${token}` };
  }
  loadProfile(): void {
    this.http.get('/api/profile').subscribe(
      (profile) => this.profileSubject.next(profile),
      (error) => console.error('Error fetching profile:', error)
    );
  }

  // Fetch the current user's profile
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(profile => this.profileSubject.next(profile)) // Mise à jour du BehaviorSubject
    );
  }

  // Update profile
  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${profile.userId}`, profile, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(updatedProfile => {
        this.profileSubject.next(updatedProfile); // ✅ Push the latest profile update
      })
    );
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
