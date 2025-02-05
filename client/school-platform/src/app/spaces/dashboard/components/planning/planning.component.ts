import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanningService } from 'src/app/spaces/dashboard/services/planning.service';
import { SuccessDialogComponent } from 'src/app/spaces/dashboard/components/layout/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/spaces/dashboard/components/layout/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/spaces/dashboard/components/layout/confirmation-dialog/confirmation-dialog.component';

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
  @ViewChild('planningForm') planningForm!: ElementRef;
  plannings: Planning[] = [];
  selectedPlanning: Planning | null = null;
  newPlanningFile: File | null = null;
  newPlanningLevel: number = 1;
  loading: boolean = false;

  constructor(
    private planningService: PlanningService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPlannings();
  }

  // Load all planning items from the server
  loadPlannings(): void {
    this.planningService.getAllPlannings().subscribe({
      next: (data: Planning[]) => (this.plannings = data),
      error: (error) => this.handleError(error, 'Error fetching plannings.')
    });
  }

  // Handle file selection
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.newPlanningFile = event.target.files[0];
    }
  }

  // Create a new planning
  createPlanning(): void {
    if (!this.newPlanningFile) {
      this.dialog.open(ErrorDialogComponent, {
        data: { message: 'Please select a file.' },
      });
      return;
    }

    this.loading = true;
    this.planningService.createPlanning(this.newPlanningLevel, this.newPlanningFile)
      .subscribe({
        next: (response) => this.handleSuccess(response, 'created'),
        error: (error) => this.handleError(error, 'Error creating planning.')
      });
  }

  updatePlanning(): void {
    if (!this.selectedPlanning) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to update this planning?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.loading = true;
        this.planningService.updatePlanning(
          this.selectedPlanning!.id,
          this.newPlanningLevel,
          this.newPlanningFile || undefined
        ).subscribe({
          next: (response) => this.handleSuccess(response, 'updated'),
          error: (error) => this.handleError(error, 'Error updating planning.')
        });
      }
    });
  }


  // Delete a planning
  deletePlanning(id: string): void {
    const planningToDelete = this.plannings.find(p => p.id === id);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this planning?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.loading = true;
        this.planningService.deletePlanning(id).subscribe({
          next: () => this.handleSuccess(planningToDelete, 'deleted'),
          error: (error) => this.handleError(error, 'Error deleting planning.')
        });
      }
    });
  }

  // Handle success response
  private handleSuccess(response: any, actionType: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        firstname: 'Niveau',
        lastname: response.niveau.toString(),
        actionType,
        role: 'Planning'
      }
    });

    this.resetForm();
    this.loadPlannings();
    this.scrollToList();
    this.loading = false;
  }

  // Handle error response
  private handleError(error: any, defaultMessage: string): void {
    let errorMessage = defaultMessage;

    if (typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.error?.message) {
      errorMessage = Array.isArray(error.error.message)
        ? error.error.message[0]
        : error.error.message;
    }

    if (error.status == 500) {
      errorMessage = `A planning for Niveau ${this.newPlanningLevel} already exists.`;
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });

    this.loading = false;
  }

  // Select a planning for editing
  selectPlanning(planning: Planning): void {
    this.selectedPlanning = { ...planning };
    this.newPlanningLevel = planning.niveau;
    this.scrollToForm();
  }

  // Scroll to the planning list
  private scrollToList(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Scroll to the form
  private scrollToForm(): void {
    if (this.planningForm) {
      this.planningForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Reset form fields
  resetForm(): void {
    this.selectedPlanning = null;
    this.newPlanningFile = null;
    this.newPlanningLevel = 1;
    this.loading = false;
  }
}
