import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/auth`; 

  private profileSubject = new BehaviorSubject<any>(null); 
  profile$ = this.profileSubject.asObservable(); 

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

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(profile => this.profileSubject.next(profile)) 
    );
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${profile.userId}`, profile, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(updatedProfile => {
        this.profileSubject.next(updatedProfile); 
      })
    );
  }
  

  validateCurrentPassword(currentPassword: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/validate-password`,
      { currentPassword },
      { headers: this.getAuthHeaders() }
    );
  }
}
