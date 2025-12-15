import { Component, EventEmitter } from '@angular/core';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  constructor(private en: EncryptionService) {}
  id = this.en.decrypt(localStorage.getItem('id'));
  user = this.en.decrypt(localStorage.getItem('username'));
  roll = this.en.decrypt(localStorage.getItem('roll'));
}
