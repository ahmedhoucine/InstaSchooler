import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

interface Alert {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();

  showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.alertSubject.next({ message, type });
  }

  getAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }
}
