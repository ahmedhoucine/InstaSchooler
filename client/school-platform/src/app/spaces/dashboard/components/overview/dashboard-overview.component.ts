import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
  totalStudents = 2478;
  totalTeachers = 983;
  totalClasses = 652;
  unpaidStudents = 1256;
}
