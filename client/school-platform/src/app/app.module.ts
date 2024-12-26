import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import this module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { FeatureCardsComponent } from './components/feature-card/feature-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { AddStudentComponent } from './pages/addstudent/addstudent.component';
import { AddTeacherComponent } from './pages/addteacher/addteacher.component';
import { AddClassComponent } from './pages/addclass/addclass.component';
import { ListStudentsComponent } from './pages/liststudents/liststudents.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    CardComponent,
    CalendarComponent,
    FeatureCardsComponent,
    AbsenceComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AddClassComponent,
    ListStudentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
