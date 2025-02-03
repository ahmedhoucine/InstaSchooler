import { Component } from '@angular/core';
import { SidebarService } from './services/sidebar/sidebar.service';
import { HeaderStateService } from './services/header-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidebarVisible = true; // Add this property declaration

  constructor(
    private sidebarService: SidebarService,
    private headerState: HeaderStateService
  ) {}

  ngOnInit() {
    this.headerState.setLoginViewState(false);
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible; // Now this will work
    });
  }
}
