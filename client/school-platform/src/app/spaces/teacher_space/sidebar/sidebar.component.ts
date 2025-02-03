import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
