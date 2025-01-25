import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';
import { FeatureCardsComponent } from '../components/feature-card/feature-card.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { AbsenceComponent } from '../components/absence/absence.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    CardComponent,
    FeatureCardsComponent,
    CalendarComponent,
    AbsenceComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    FeatureCardsComponent,
    CalendarComponent,
    AbsenceComponent,
    HeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
