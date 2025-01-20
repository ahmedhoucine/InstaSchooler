import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  private apiUrl = 'http://localhost:5000/enseignant'; // URL de l'API backend

  constructor(private http: HttpClient) {}

  // Récupérer les données des enseignants
  getEnseignants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Mettre à jour les données d'un enseignant
  updateEnseignant(enseignant: any): Observable<any> {
    const url = `${this.apiUrl}/${enseignant._id}`;
    return this.http.put<any>(url, enseignant);
  }
  sendTicket(ticket: any): Observable<any> {
    const ticketApiUrl = 'http://localhost:5000/send-ticket';
    return this.http.post<any>(ticketApiUrl, ticket);
  }
  
}
