import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/spaces/dashboard/services/sidebar/sidebar.service';
import { HeaderStateService } from 'src/app/spaces/dashboard/services/header-state.service';
import { ReportService } from 'src/app/spaces/dashboard/services/report.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoginView = false;

  constructor(
    private sidebarService: SidebarService,
    private headerState: HeaderStateService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.headerState.currentHeaderState.subscribe((state: boolean) => {
      this.isLoginView = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  generateReport(): void {
    this.reportService.triggerGenerateReport();
  }
}
