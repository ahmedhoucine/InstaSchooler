import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profileEdit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
  loading = false;
  profile: any = {}; // Declare profile property with a default structure
  private profileSubscription: Subscription = new Subscription();
  cdr: any;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    console.log('NavbarComponent loaded');
    this.fetchProfile();
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe(); // Clean up to prevent memory leaks
  }

  fetchProfile(): void {
    this.loading = true;
    this.profileSubscription = this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data }; // Update profile data
        this.cdr.detectChanges(); // Manually trigger change detection

        this.loading = false;
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
        
      }
    );
  }

  onEditProfile(): void {
    this.router.navigate(['/student/edit-profile']).then(() => {
      // Optionally, you can refresh the profile here after editing
      this.fetchProfile();
    });
  }

  onLogout(): void {
    localStorage.removeItem('authToken'); // Clear token or session
    this.router.navigate(['/auth/login']); // Redirect to login
  }
}
