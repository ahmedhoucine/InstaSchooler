import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';  // Import SharedModule
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,MatToolbarModule
  ]
})
export class AuthModule { }
