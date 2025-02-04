import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';  // Import SharedModule


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
