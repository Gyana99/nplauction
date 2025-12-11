import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerPlayer(formData: any): Observable<any> {
      console.log(this.baseUrl);
    return this.http.post(`${this.baseUrl}registration`, formData);
  }
}
