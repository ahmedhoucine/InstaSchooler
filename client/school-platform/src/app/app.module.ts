import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { FeatureCardsComponent } from './components/feature-card/feature-card.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { AddStudentComponent } from './pages/dashboard/student/addstudent/addstudent.component';
import { AddTeacherComponent } from './pages/dashboard/teacher/addteacher/addteacher.component';
import { AddClassComponent } from './pages/dashboard/class/addclass/addclass.component';
import { ListStudentsComponent } from './pages/dashboard/student/liststudents/liststudents.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardOverviewComponent } from './pages/dashboard/class/pages/dashboard/overview/dashboard-overview/dashboard-overview.component';


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
    DashboardOverviewComponent,

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
