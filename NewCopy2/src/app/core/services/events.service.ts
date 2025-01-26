import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

 // Create a new event without fetching the profile
createEvent(event: EventData): Observable<EventData> {
  console.log('Event Data:', event); // Log the event data to check the studentId
  console.log();
  if (event.studentId) {
    console.log('Creating event with studentId:', event.studentId);
    return this.http.post<EventData>(this.baseUrl, event);  // Create the event
  } else {
    console.error('Student ID not found, cannot create event');
    throw new Error('Student ID not found');  // Throw an error if no studentId found
  }
  
}

getEventsByUserId(userId: string): Observable<EventData[]> {
  console.log('Fetching events for userId:', userId); 
  return this.http.get<EventData[]>(`${this.baseUrl}/by-user?userId=${userId}`);
}


// Fetch all events
getAllEvents(): Observable<EventData[]> {
  return this.http.get<EventData[]>(this.baseUrl);  // Fetch all events
}
  // Delete an event
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

 
  // In events.service.ts
updateEvent(id: string, eventData: EventData): Observable<EventData> {
  return this.http.put<EventData>(`${this.baseUrl}/${id}`, eventData);
}

}
