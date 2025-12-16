import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { EncryptionService } from 'src/app/services/encryption.service';


@Component({
  selector: 'app-mypoint',
  templateUrl: './mypoint.component.html',
  styleUrls: ['./mypoint.component.scss']
})
export class MypointComponent {
  amount: any;
  histry: any = [];
  constructor(private cm: CommonService, private en: EncryptionService, private Router: Router) { }
  id = this.en.decrypt(localStorage.getItem('id'));
  roll = this.en.decrypt(localStorage.getItem('roll'));
  ngOnInit(): void {
    if (this.roll == '1' || this.roll == '0') {
      this.Router.navigate(['dashboard']);
    }
    this.getPoint();
  }
  getPoint() {
    let param = {
      adminid: this.id,
    }
    this.cm.mypointandhistry(param).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.amount = res.amount;
        this.histry = res.total_players;
      }
    })
  }

}
