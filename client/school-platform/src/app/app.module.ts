import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';  // Import JwtModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { DashboardModule } from '../app/spaces/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { EditProfileModule } from './spaces/student_space/modules/edit-profile/edit-profil.module';
import { JoinComponent } from './spaces/join/join.component';

// Function to get the token from localStorage
export function jwtTokenGetter() {
  return localStorage.getItem('authToken');  // Or wherever you're storing the token
}

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Required for toastr and JWT functionality
    EditProfileModule,
    DashboardModule,
    SharedModule,
    ToastrModule.forRoot({    // Make sure you call forRoot() in the app module
      timeOut: 3000,          // Default timeout for toasts
      positionClass: 'toast-top-right', // Positioning of toasts
      preventDuplicates: true // Prevent duplicates
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,  // Function to get the JWT token
        allowedDomains: ['localhost:3000'],  // Add your API's domains here
        disallowedRoutes: ['localhost:3000/auth/login'],  // Add routes that shouldn't require JWT
      }
    }),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
