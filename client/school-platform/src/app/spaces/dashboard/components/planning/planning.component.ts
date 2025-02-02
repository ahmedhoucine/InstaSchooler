import { Component, OnInit } from '@angular/core';
import { PlanningService } from 'src/app/spaces/dashboard/services/planning.service';

interface Planning {
  id: string;
  niveau: number;
  filename: string;
  path: string;
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  plannings: Planning[] = [];
  selectedPlanning: Planning | null = null;
  newPlanningFile: File | null = null;
  newPlanningLevel: number = 1;
  loading: boolean = false;

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.loadPlannings();
  }

  // Load all plannings
  loadPlannings(): void {
    this.planningService.getAllPlannings().subscribe((data: Planning[]) => {
      this.plannings = data;
    });
  }

  // Handle file input change
  onFileSelected(event: any): void {
    this.newPlanningFile = event.target.files[0];
  }

  // Create new planning
  createPlanning(): void {
    if (this.newPlanningFile) {
      this.loading = true;
      this.planningService.createPlanning(this.newPlanningLevel, this.newPlanningFile).subscribe(
        (newPlanning: Planning) => {
          this.plannings.push(newPlanning);
          this.newPlanningFile = null;
          this.loading = false;
        },
        (error: any) => {
          console.error('Error creating planning:', error);
          this.loading = false;
        }
      );
    }
  }

  // Update planning
  updatePlanning(): void {
    if (this.selectedPlanning && this.newPlanningFile) {
      this.loading = true;
      this.planningService.updatePlanning(this.selectedPlanning.id, this.newPlanningLevel, this.newPlanningFile).subscribe(
        (updatedPlanning: Planning) => {
          const index = this.plannings.findIndex((p) => p.id === updatedPlanning.id);
          if (index !== -1) {
            this.plannings[index] = updatedPlanning;
          }
          this.selectedPlanning = null;
          this.newPlanningFile = null;
          this.loading = false;
        },
        (error: any) => {
          console.error('Error updating planning:', error);
          this.loading = false;
        }
      );
    }
  }

  // Delete planning
  deletePlanning(id: string): void {
    this.loading = true;
    this.planningService.deletePlanning(id).subscribe(
      (success: any) => {
        if (success) {
          this.plannings = this.plannings.filter((planning) => planning.id !== id);
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error deleting planning:', error);
        this.loading = false;
      }
    );
  }

  // Select planning for updating
  selectPlanning(planning: Planning): void {
    this.selectedPlanning = { ...planning };
    this.newPlanningLevel = planning.niveau;
  }

  // Reset form
  resetForm(): void {
    this.selectedPlanning = null;
    this.newPlanningFile = null;
    this.newPlanningLevel = 1;
  }
}
