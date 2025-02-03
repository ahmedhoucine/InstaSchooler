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
  styleUrls: ['./planning.component.scss'],
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
    this.planningService.getAllPlannings().subscribe(
      (data: Planning[]) => {
        this.plannings = data;
      },
      (error) => console.error('Error fetching plannings:', error)
    );
  }

  // Handle file input change
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.newPlanningFile = event.target.files[0];
    }
  }

  // Create new planning
  createPlanning(): void {
    if (!this.newPlanningFile) {
      console.warn('No file selected');
      return;
    }

    this.loading = true;
    this.planningService.createPlanning(this.newPlanningLevel, this.newPlanningFile).subscribe(
      () => {
        this.resetForm();
        this.loadPlannings(); // Reload list
      },
      (error) => {
        console.error('Error creating planning:', error);
        this.loading = false;
      }
    );
  }

  // Update planning
  updatePlanning(): void {
    if (!this.selectedPlanning) return;

    this.loading = true;
    this.planningService
      .updatePlanning(
        this.selectedPlanning.id,
        this.newPlanningLevel,
        this.newPlanningFile || new File([], '') // Keep existing file if not changed
      )
      .subscribe(
        () => {
          this.resetForm();
          this.loadPlannings(); // Reload list
        },
        (error) => {
          console.error('Error updating planning:', error);
          this.loading = false;
        }
      );
  }

  // Delete planning
  deletePlanning(id: string): void {
    this.loading = true;
    this.planningService.deletePlanning(id).subscribe(
      (success) => {
        if (success) this.loadPlannings(); // Reload list after delete
        this.loading = false;
      },
      (error) => {
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
    this.loading = false;

    // Reset file input
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) fileInput.value = '';
  }
}
