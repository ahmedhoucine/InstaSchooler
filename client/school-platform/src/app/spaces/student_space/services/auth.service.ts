import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'; // Import JwtHelperService here
import { environment } from 'src/environment';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string; 
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`; 

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((response: LoginResponse) => {
        
        console.log('Login successful, token:', response.token);
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);  
    }
    return false;  
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
