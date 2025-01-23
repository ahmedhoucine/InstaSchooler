import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventData } from 'src/app/modules/calendar/components/event-details-modal/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000/events'; // Base URL of the backend

  constructor(private http: HttpClient) {}

  // Fetch a single event by ID
  getEventById(id: string): Observable<EventData> {
    return this.http.get<EventData>(`${this.baseUrl}/${id}`);
  }

  // Create a new event
  createEvent(event: EventData): Observable<EventData> {
    return this.http.post<EventData>(this.baseUrl, event);
  }

  // Update an existing event
  updateEvent(id: string, event: EventData): Observable<EventData> {
console.log("---------------------------------",id);

    return this.http.put<EventData>(`${this.baseUrl}/${id}` ,event);
  }

  // Fetch all events
  getAllEvents(): Observable<EventData[]> {
    return this.http.get<EventData[]>(this.baseUrl);
  }

  // Delete an event
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
