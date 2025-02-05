import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;



  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed', this.isCollapsed);
    }
  }
}
