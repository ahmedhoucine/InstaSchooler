import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService here

// Define the structure of the login request and response
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; // JWT token returned from the backend
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth/login'; // Your backend URL for login

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  // Login function to authenticate the user
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((response: LoginResponse) => {
        // Save token to localStorage upon successful login
        console.log('Login successful, token:', response.token);
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  // Helper function to check if the token is valid (not expired)
  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);  // Check if the token is expired
    }
    return false;  // Return false if no token is found
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
