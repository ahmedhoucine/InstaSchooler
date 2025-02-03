import { Component , OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/spaces/dashboard/services/auth.service';
import { Router } from '@angular/router';
import { HeaderStateService } from 'src/app/spaces/dashboard/services/header-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './dashboard-login.component.html',
  styleUrls: ['./dashboard-login.component.scss'],
})
export class DashboardLoginComponent implements OnDestroy {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private headerState: HeaderStateService, private authService:AuthService,private router: Router) {}

  ngOnInit() {
    this.headerState.setLoginViewState(true);
  }

  ngOnDestroy() {
    this.headerState.setLoginViewState(false);
  }

  onSubmit() {
    if (this.username && this.password) {
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // Call the login method in the AuthService
      this.authService.login(this.username, this.password).subscribe(
        (response: { token: string; }) => {
          if (response && response.token) {
            // Store the token in localStorage
            localStorage.setItem('access_token', response.token);
            // Redirect to the dashboard overview page
            this.router.navigate(['/dashboard/overview']);
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Set the error message to be displayed
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
  onInputChange() {
    this.errorMessage = '';
  }
}
