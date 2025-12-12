import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

 private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerPlayer(formData: any): Observable<any> {
      console.log(this.baseUrl);
    return this.http.post(`${this.baseUrl}login`, formData);
  }
}
