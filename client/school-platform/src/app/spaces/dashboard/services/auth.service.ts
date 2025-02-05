import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/admin-login`, loginData).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('access_token', response.token);
        }
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['join/']); // Redirect to login page
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Get the current token from localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
