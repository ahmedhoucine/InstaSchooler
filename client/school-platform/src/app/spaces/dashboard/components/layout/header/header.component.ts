import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/spaces/dashboard/services/sidebar/sidebar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
}
