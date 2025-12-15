import { Component, OnInit } from '@angular/core'; // <--- Added OnInit here
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Make sure this matches your actual file name (.sass or .scss)
})
export class LoginComponent implements OnInit {
  // <--- Added implements OnInit here

  loginData = {
    username: '',
    password: '',
    captchaInput: '',
  };

  generatedCaptcha: string = '';
  captchaError: boolean = false;

  constructor(
    private router: Router,
    private CS: CommonService,
    private en: EncryptionService
  ) {}

  // This runs automatically when the component loads
  ngOnInit(): void {
    this.generateCaptcha();
  }

  // Generate a random 6-character string
  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No confusing chars like I, 1, 0, O
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.generatedCaptcha = result;
  }

  onLogin() {
    this.captchaError = false;
    // 1. Check Captcha
    if (this.loginData.username == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Username Required',
        text: 'Please enter your username',
        showConfirmButton: true,
      });
    } else if (this.loginData.password == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Password Required',
        text: 'Please enter your password',
        showConfirmButton: true,
      });
    } else if (this.loginData.captchaInput !== this.generatedCaptcha) {
      this.generateCaptcha();
      this.captchaError = true;
      Swal.fire({
        icon: 'error',
        title: 'Invalid Captcha',
        text: 'Please enter the correct captcha',
        showConfirmButton: true,
      });
    } else {
      let param = {
        userid: this.loginData.username,
        password: this.loginData.password,
      };
      this.CS.registerPlayer(param).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          let id = res.data.id;
          let username = res.data.userId;
          let roll = res.data.rollid;
          console.log(id);
          console.log(username);
          console.log(roll);

          localStorage.setItem('id', this.en.encrypt(id));
          localStorage.setItem('username', this.en.encrypt(username));
          localStorage.setItem('roll', this.en.encrypt(roll));
          //window.location.href = 'dashboard';

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Redirecting to dashboard...',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = 'dashboard';
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: res.message || 'Invalid username or password',
          });
        }
      });
    }
  }
}
