import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private generateReportSource = new Subject<void>();
  generateReport$ = this.generateReportSource.asObservable();

  triggerGenerateReport() {
    this.generateReportSource.next();
  }
}
