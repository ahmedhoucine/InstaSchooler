import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/spaces/dashboard/services/sidebar/sidebar.service';
import { HeaderStateService } from 'src/app/spaces/dashboard/services/header-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoginView = false;

  constructor(
    private sidebarService: SidebarService,
    private headerState: HeaderStateService
  ) {}

  ngOnInit() {
    this.headerState.currentHeaderState.subscribe((state: boolean) => {
      this.isLoginView = state;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
