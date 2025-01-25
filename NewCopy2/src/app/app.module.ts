import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';  // Import JwtModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileModule } from './modules/edit-profile/edit-profil.module';
import { CoreModule } from './core/core.module';


// Function to get the token from localStorage
export function jwtTokenGetter() {
  return localStorage.getItem('authToken');  // Or wherever you're storing the token
}

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EditProfileModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter, // Set the function to get the JWT token
        allowedDomains: ['localhost:3000'],  // Add your API's domains here
        disallowedRoutes: ['localhost:3000/auth/login'],  // Add routes that shouldn't require JWT
      }
    })
  ],
  providers: [],  // No need to add JwtHelperService here
  bootstrap: [AppComponent]
})
export class AppModule { }
