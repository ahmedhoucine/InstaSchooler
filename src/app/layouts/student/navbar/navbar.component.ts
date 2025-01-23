import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profileEdit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
  loading = false;
  profile: any = {}; // Declare profile property with a default structure

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    console.log('NavbarComponent loaded');
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data }; // Assume `data` contains profile details
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
      }
    );
  }

  onEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  onLogout(): void {
    localStorage.removeItem('authToken'); // Clear token or session
    this.router.navigate(['/auth/login']); // Redirect to login
  }
}
