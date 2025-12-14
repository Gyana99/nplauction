import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = "YOUR_SECRET_KEY_123"; // change this key

  encrypt(data: any): string {
    if (data === undefined || data === null) {
      return "";
    }
    const text = String(data);
    return CryptoJS.AES.encrypt(text, this.secretKey).toString();
  }


  decrypt(data: string | null): string {
    if (!data) return "";
    return CryptoJS.AES.decrypt(data, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

}
