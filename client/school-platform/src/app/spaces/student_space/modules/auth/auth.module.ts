import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from '../../components/layouts/student/alert/alert.component';

@NgModule({
  declarations: [
    LoginComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
  ]
})
export class AuthModule { }
