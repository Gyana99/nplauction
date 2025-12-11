import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // For *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // For reactive forms
import Swal from 'sweetalert2';
import { RegistrationService } from '../services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

// Assuming a Standalone Component setup for modern Angular
@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss'], // Use SCSS for structure/colors
})
export class PlayerRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  readonly MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
  readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
  base64Image: any;
   loading = false;
  constructor(private fb: FormBuilder, private Reg: RegistrationService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      playerName: ['', [Validators.required, Validators.minLength(3)]],
      playerAge: [
        '',
        [Validators.required, Validators.min(10), Validators.max(60)],
      ],
      playerType: ['', [Validators.required]],
      playerPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Basic 10-digit check
      playerImage: [
        null,
        [
          Validators.required,
          this.fileTypeValidator(),
          this.fileSizeValidator(),
        ],
      ],
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
      if (
        file &&
        file instanceof File &&
        file.size > this.MAX_FILE_SIZE_BYTES
      ) {
        return { fileSize: true };
      }
      return null;
    };
  }

  // Custom Validator to check file type (jpg, jpeg, png)
  fileTypeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (
        file &&
        file instanceof File &&
        !this.ALLOWED_TYPES.includes(file.type)
      ) {
        return { fileType: true };
      }
      return null;
    };
  }
  private getFileErrorMessage(errors: any): string {
    if (errors?.['fileSize']) {
      return 'File size exceeds the 5MB limit. Please select a smaller image.';
    }
    if (errors?.['fileType']) {
      return 'Invalid file type. Only JPG, JPEG, and PNG formats are allowed.';
    }
    return 'An unknown file validation error occurred.';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    // 1. Set value + validate
    this.f['playerImage'].setValue(file);
    this.f['playerImage'].markAsTouched();
    this.f['playerImage'].updateValueAndValidity();

    // 2. If invalid → SweetAlert + reset
    if (this.f['playerImage'].invalid) {
      const errors = this.f['playerImage'].errors;

      Swal.fire({
        icon: 'error',
        title: 'Image Error!',
        html: this.getFileErrorMessage(errors),
        confirmButtonText: 'Understood',
        showCloseButton: true,
        customClass: {
          popup: 'swal-custom-popup',
          confirmButton: 'swal-custom-button',
        },
      });

      event.target.value = null;
      this.f['playerImage'].setValue(null);
      this.imagePreview = null;
      this.base64Image = null;
      return;
    }

    // 3. SUCCESS: convert to Base64 + preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.base64Image = reader.result as string; // <-- HERE IS THE BASE64
    };
    reader.readAsDataURL(file);
  }

  // --- Submission ---
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      console.error('Form is invalid. Cannot submit.');
      return;
    } else {
      let param = {
        name: this.registrationForm.value.playerName,
        mobile_no: this.registrationForm.value.playerPhone,
        age: this.registrationForm.value.playerAge,
        photo: this.base64Image,
        type_of_player: this.registrationForm.value.playerType,
      };
      this.loading = true;
     this.Reg.registerPlayer(param)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: any) => {
        console.log(res.status);
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Player Registered Successfully!',
            text: 'For any help contact: 8118081551',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text:  'Please try again later contact: 7205569189',
            confirmButtonText: 'Close',
          });
        }
      }
      });
    }

    // TODO: Implement your actual submission logic here (e.g., sending to an API)
    console.log('Form Submitted Successfully:', this.registrationForm.value);
    // alert('Registration Successful! Data logged to console.');
  }
  clearImageSelection() {
    const fileInput = document.getElementById(
      'playerImage'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.f['playerImage'].setValue(null);
    this.imagePreview = null;
  }
  onReset() {
    if (this.loading) { return; }
    this.registrationForm.reset();
    this.clearImageSelection();
  }
}
