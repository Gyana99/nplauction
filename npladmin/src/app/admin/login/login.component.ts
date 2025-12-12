import { Component, OnInit } from '@angular/core'; // <--- Added OnInit here
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Make sure this matches your actual file name (.sass or .scss)
})
export class LoginComponent implements OnInit { // <--- Added implements OnInit here

  loginData = {
    username: '',
    password: '',
    captchaInput: '',
  };

  generatedCaptcha: string = '';
  captchaError: boolean = false;

  constructor(private router: Router,private CS:CommonService) {}

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
    if (this.loginData.captchaInput !== this.generatedCaptcha) {
      this.generateCaptcha();
    }else{
      this.captchaError = true;
      let param = {
        'userid': this.loginData.username,
        'password': this.loginData.password,
      }
      this.CS.registerPlayer(param).subscribe((res:any)=>{
        console.log(res);
        if(res.status){
          let id = res.data.id;
          let username = res.data.userId;
          let roll = res.data.rollid;
          console.log(id);
          console.log(username);
          console.log(roll);
          localStorage.setItem('id',id);
          localStorage.setItem('username',username);
          localStorage.setItem('roll',roll);
          window.location.href = 'dashboard';
        }
      })
    }
  }
}
