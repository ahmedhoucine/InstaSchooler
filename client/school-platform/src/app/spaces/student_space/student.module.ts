import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';  // Import JwtModule
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileModule } from './modules/edit-profile/edit-profil.module';
import { CoreModule } from '../../core/core.module';
import { environment } from '../../../environment'; // Import environment


// Function to get the token from localStorage
export function jwtTokenGetter() {
  return localStorage.getItem('authToken');  // Or wherever you're storing the token
}

@NgModule({
  declarations: [
    StudentComponent,

  ],
  imports: [
    BrowserModule,
    StudentRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EditProfileModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter, // Set the function to get the JWT token
        allowedDomains: [new URL(environment.apiUrl).host],  // Add your API's domains here
        disallowedRoutes: [`${environment.apiUrl}/auth/login`],  // Add routes that shouldn't require JWT
      }
    })
  ],
  providers: [],  // No need to add JwtHelperService here
  bootstrap: [StudentComponent]
})
export class StudentModule { }
