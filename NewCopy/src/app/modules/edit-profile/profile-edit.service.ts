import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateProfileDto } from 'src/app/models/update-profile.model';  // Import the DTO

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 

  constructor(private http: HttpClient) {}

  // Get profile data
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  // Update profile data
  updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, updateProfileDto);
  }
}
