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
import { TeacherRoutingModule } from './teacher-routing.module';

// Components
import { TeacherComponent } from './teacher.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { ListeComponent } from './liste/liste.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';


@NgModule({
  declarations: [
    TeacherComponent,
    AddCourseComponent,
    CoursesComponent,
    ListeComponent,
    AddTaskComponent,
    NotificationComponent,
    DashboardComponent,
    SettingsComponent,
    StudentComponent,
    LoginComponent,
    TeacherRegisterComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TeacherRoutingModule,
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
  bootstrap: [TeacherComponent],
})
export class TeacherModule {}
