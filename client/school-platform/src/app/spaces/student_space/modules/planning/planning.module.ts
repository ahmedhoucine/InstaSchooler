import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { PlanningRoutingModule } from './planning-routing.module';



@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule
  ]
  
})
export class PlanningModule { }
