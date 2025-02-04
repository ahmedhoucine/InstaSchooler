import { Component } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  message: string = '';
  type: 'success' | 'error' = 'error';
  show = false;

  constructor(private alertService: AlertService) {
    this.alertService.getAlert().subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.type = alert.type;
        this.show = true;

        // Auto-hide the alert after 3 seconds
        setTimeout(() => this.show = false, 3000);
      }
    });
  }

  closeAlert() {
    this.show = false;
  }
}
