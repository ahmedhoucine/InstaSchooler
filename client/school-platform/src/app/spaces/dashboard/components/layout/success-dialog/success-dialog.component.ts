import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface SuccessDialogData {
  firstname: string;
  lastname: string;
  actionType: string;
  role?: string; // Optional: 'Teacher' or 'Student'
}

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
  ) {
    // Use the provided role if available; otherwise default to 'Student'
    const role = data.role || 'Student';
    this.message = `${role} ${data.firstname} ${data.lastname} has been successfully ${data.actionType}.`;
  }
}
