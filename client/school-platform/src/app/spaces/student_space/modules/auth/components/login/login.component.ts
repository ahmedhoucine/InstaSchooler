import { Component } from '@angular/core';

import { Router } from '@angular/router';  // Import Router for navigation
import { AuthService } from 'src/app/spaces/student_space/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {}

onLogin() {
  this.authService.login({ email: this.email, password: this.password }).subscribe(
    (response) => {
      
      localStorage.setItem('authToken', response.token);  // Set the token in localStorage
      this.router.navigate(['/student']);  // Navigate to the protected layout route
    },
    (error) => {
      alert('Login failed. Please check your credentials.');
      console.error(error);
    }
  );
}
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

}  
