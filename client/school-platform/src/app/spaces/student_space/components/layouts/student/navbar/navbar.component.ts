import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/spaces/student_space/services/profileEdit.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
  profile: any = {}; // Stocke les infos du profil

  profile$ = this.profileService.profile$; // Utilisation directe de l’Observable

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    console.log('NavbarComponent loaded');
  
    this.profileService.profile$.subscribe(profile => {
      if (profile) {
        this.profile = profile;
      }
    });
  
    this.profileService.getProfile().subscribe(); // Initial fetch
  }
  
  

  onLogout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth/login']);
  }
}
