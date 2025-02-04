import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../spaces/dashboard/components/layout/card/card.component';
import { CalendarComponent } from '../spaces/dashboard/components/layout/calendar/calendar.component';
import { AbsenceComponent } from '../spaces/dashboard/components/absence/absence.component';
import { HeaderComponent } from '../spaces/dashboard/components/layout/header/header.component';
import { SidebarComponent } from '../spaces/dashboard/components/layout/sidebar/sidebar.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CardComponent,
    CalendarComponent,
    AbsenceComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    // * MATERIAL IMPORTS
    MatInputModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [
    CardComponent,
    CalendarComponent,
    AbsenceComponent,
    HeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
