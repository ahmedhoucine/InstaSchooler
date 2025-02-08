import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EventData } from 'src/app/spaces/student_space/modules/calendar/components/event-details-modal/event.model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = `${environment.apiUrl}/events`; 

  constructor(private http: HttpClient) {}

  getEventById(id: string): Observable<EventData> {
    return this.http.get<EventData>(`${this.baseUrl}/${id}`);
  }

createEvent(event: EventData): Observable<EventData> {
  console.log('Event Data:', event); 
  console.log();
  if (event.studentId) {
    console.log('Creating event with studentId:', event.studentId);
    return this.http.post<EventData>(this.baseUrl, event);  
  } else {
    console.error('Student ID not found, cannot create event');
    throw new Error('Student ID not found');  
  }

}

getEventsByUserId(userId: string): Observable<EventData[]> {
  console.log('Fetching events for userId:', userId);
  return this.http.get<EventData[]>(`${this.baseUrl}/by-user?userId=${userId}`);
}


getAllEvents(): Observable<EventData[]> {
  return this.http.get<EventData[]>(this.baseUrl);  
}
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


updateEvent(id: string, eventData: EventData): Observable<EventData> {
  return this.http.put<EventData>(`${this.baseUrl}/${id}`, eventData);
}

}
