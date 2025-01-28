import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { EditProfileModule } from './modules/edit-profile/edit-profil.module';
import { CoreModule } from '../../core/core.module';


// Function to get the token from localStorage
export function jwtTokenGetter() {
  return localStorage.getItem('authToken');  // Or wherever you're storing the token
}

@NgModule({
  declarations: [
    StudentComponent,

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    CoreModule,
    HttpClientModule,
    EditProfileModule,
  ],
  providers: [],  // No need to add JwtHelperService here
  bootstrap: [StudentComponent]
})
export class StudentModule { }
