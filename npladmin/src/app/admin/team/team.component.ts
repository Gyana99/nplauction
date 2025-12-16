import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teamForm!: FormGroup;
  teams: any[] = [];     // team list
  editMode = false;
  editId: number | null = null;
  butt: any = 'Save';
  constructor(private fb: FormBuilder, private CS: CommonService, private en: EncryptionService,private Router:Router) { }
  roll = this.en.decrypt(localStorage.getItem('roll'));
  ngOnInit(): void {

    if (this.roll == '2' || this.roll == '0') {
      this.Router.navigate(['dashboard'])
    }
    this.initForm();
    this.loadTeams(); // API call later
    this.teamForm.patchValue({ created_by: this.en.decrypt(localStorage.getItem('id')) });

  }

  initForm() {
    this.teamForm = this.fb.group({
      team_name: ['', Validators.required],
      short_name: ['', Validators.required],
      logo: ['', Validators.required],
      woner_name: ['', Validators.required],
      woner_image: ['', Validators.required],
      created_by: [this.en.decrypt(localStorage.getItem('id'))],
      id: ['']
    });
  }

  submit() {
    if (this.teamForm.invalid) return;

    if (this.editMode) {

      this.CS.updateTeam(this.teamForm.value).subscribe((res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Team Added',
            text: 'Team updated successfully',
            showConfirmButton: true
          });
          this.ngOnInit();
        }
      });
    } else {
      this.CS.addTeam(this.teamForm.value).subscribe((res: any) => {
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Team Added',
            text: 'Team added successfully',
            showConfirmButton: true
          });
          this.ngOnInit();
        }
      })
      // console.log('CREATE', this.teamForm.value);
      // call create API
    }

    this.resetForm();
    this.loadTeams();
  }

  editTeam(team: any) {
    this.editMode = true;
    this.editId = team.id;
    this.logoPreview = environment.apiUrl + 'storage/uploads/logo';
    this.ownerPreview = environment.apiUrl + 'storage/uploads/playerimage';
    this.butt = 'Updat';
    this.teamForm.patchValue({ id: this.editId });
    this.teamForm.patchValue(team);
  }

  resetForm() {
    this.teamForm.reset({
      amount: 0,
      amount_status: 0,
      status: 1
    });
    this.editMode = false;
    this.editId = null;
  }

  loadTeams() {
    this.CS.viewTeam().subscribe((res: any) => {
      if (res.status) {
        this.teams = res.data;
      }
    });
    // API CALL HERE
    // this.teams = [
    //   { id: 1, team_name: 'Warriors', short_name: 'WAR', amount: 5000, status: 1 }
    // ];
  }
  logoPreview: string | null = null;
  ownerPreview: string | null = null;

  onImageSelect(event: any, field: 'logo' | 'woner_image') {
    const file: File = event.target.files[0];
    if (!file) return;

    /* ✅ TYPE CHECK */
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: 'Only JPG, JPEG, and PNG images are allowed.',
        confirmButtonColor: '#d33'
      });
      event.target.value = '';
      return;
    }

    /* ✅ SIZE CHECK (500 MB) */
    const maxSize = 500 * 1024 * 1024; // 500 MB
    if (file.size > maxSize) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Image size must be less than 500 MB.',
        confirmButtonColor: '#d33'
      });
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      if (field === 'logo') {
        this.logoPreview = base64;
        this.teamForm.patchValue({ logo: base64 });
      } else {
        this.ownerPreview = base64;
        this.teamForm.patchValue({ woner_image: base64 });
      }
    };

    reader.readAsDataURL(file);
  }
  isInvalid(controlName: string): boolean {
    const control = this.teamForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

}
