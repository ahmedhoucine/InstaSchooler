import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../spaces/dashboard/components/layout/card/card.component';
import { FeatureCardsComponent } from '../spaces/dashboard/components/layout/feature-card/feature-card.component';
import { CalendarComponent } from '../spaces/dashboard/components/layout/calendar/calendar.component';
import { AbsenceComponent } from '../spaces/dashboard/components/absence/absence.component';
import { HeaderComponent } from '../spaces/dashboard/components/layout/header/header.component';
import { SidebarComponent } from '../spaces/dashboard/components/layout/sidebar/sidebar.component';

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
