import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from '../app/pages/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Required for toastr animations
    ToastrModule.forRoot({    // Make sure you call forRoot() in the app module
      timeOut: 3000,          // Default timeout for toasts
      positionClass: 'toast-top-right', // Positioning of toasts
      preventDuplicates: true // Prevent duplicates
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
