import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import Swal from 'sweetalert2';

// Assuming a Standalone Component setup for modern Angular
@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss'] // Use SCSS for structure/colors
})
export class PlayerRegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  readonly MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      playerAge: ['', [Validators.required, Validators.min(16), Validators.max(60)]],
      playerType: ['', [Validators.required]],
      playerPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Basic 10-digit check
      playerImage: [null, [Validators.required, this.fileTypeValidator(), this.fileSizeValidator()]]
    });
  }

  // Helper to easily access form controls in the template
  get f() {
    return this.registrationForm.controls;
  }

  // --- Custom Validators for File Input ---

  // Custom Validator to check file size (up to 5MB)
  fileSizeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file && file instanceof File && file.size > this.MAX_FILE_SIZE_BYTES) {
        return { fileSize: true };
      }
      return null;
    };
  }

  // Custom Validator to check file type (jpg, jpeg, png)
  fileTypeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file && file instanceof File && !this.ALLOWED_TYPES.includes(file.type)) {
        return { fileType: true };
      }
      return null;
    };
  }


  // Helper to get error messages from the custom validators
  private getFileErrorMessage(errors: any): string {
    if (errors?.['fileSize']) {
      return `File size exceeds the **5MB** limit. Please select a smaller image.`;
    }
    if (errors?.['fileType']) {
      return `Invalid file type. Only **JPG, JPEG, and PNG** formats are allowed.`;
    }
    return 'An unknown file validation error occurred.';
  }

  // --- Image Handling Logic ---
  onFileChange(event: any) {
    const file = event.target.files[0];

    // 1. Manually set the value, mark as touched, and force validation update
    this.f['playerImage'].setValue(file);
    this.f['playerImage'].markAsTouched();
    this.f['playerImage'].updateValueAndValidity(); // This runs your custom validators

    // 2. Check for validation errors immediately
    if (this.f['playerImage'].invalid) {
      const errors = this.f['playerImage'].errors;

      // Show SweetAlert2 for invalid files
      Swal.fire({
        icon: 'error',
        title: 'Image Error!',
        html: this.getFileErrorMessage(errors),
        confirmButtonText: 'Understood',
        showCloseButton: true, // <-- Added close button
        customClass: {
          popup: 'swal-custom-popup',
          confirmButton: 'swal-custom-button'
        }
      });

      // Clear the file input and preview after showing the error
      event.target.value = null; // Clear the native input value
      this.f['playerImage'].setValue(null); // Clear the form control value
      this.imagePreview = null;
      return;
    }

    // 3. If validation passes, generate image preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  // --- Submission ---
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      console.error('Form is invalid. Cannot submit.');
      return;
    }

    // TODO: Implement your actual submission logic here (e.g., sending to an API)
    console.log('Form Submitted Successfully:', this.registrationForm.value);
    alert('Registration Successful! Data logged to console.');
  }
  clearImageSelection() {
  const fileInput = document.getElementById('playerImage') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }

  this.f['playerImage'].setValue(null);
  this.imagePreview = null;
}

}

