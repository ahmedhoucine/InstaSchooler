// src/app/shared/services/validation.service.ts
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  getValidationMessage(control: AbstractControl | null, fieldName: string): string {
    if (!control || !control.errors) return '';

    const errors = control.errors;
    const messages: { [key: string]: string } = {
      required: `${fieldName} is required`,
      email: `Please enter a valid ${fieldName.toLowerCase()} address`,
      pattern: `Invalid ${fieldName.toLowerCase()} format`,
    };

    const errorKey = Object.keys(errors)[0];
    return messages[errorKey] || `Invalid ${fieldName.toLowerCase()}`;
  }

  markAllAsTouched(form: AbstractControl): void {
    if (form instanceof FormGroup) {
      Object.values(form.controls).forEach(control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markAllAsTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    } else if (form instanceof FormArray) {
      form.controls.forEach(control => {
        if (control instanceof FormGroup || control instanceof FormArray) {
          this.markAllAsTouched(control);
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
