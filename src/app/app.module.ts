import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules Angular Material nécessaires
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { ListeComponent } from './liste/liste.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCourseComponent,
    CoursesComponent,
    ListeComponent,
    AddTaskComponent,
    NotificationComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Modules Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
