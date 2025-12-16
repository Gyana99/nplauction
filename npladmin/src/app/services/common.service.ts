import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerPlayer(formData: any): Observable<any> {

    return this.http.post(`${this.baseUrl}login`, formData);
  }
  allplyer(): Observable<any> {
    return this.http.post(`${this.baseUrl}allplyer`, null);
  }
  accept(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}accept`, formdata);
  }
  addTeam(formdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}addteam`, formdata);

  }
  viewTeam(): Observable<any> {
    return this.http.post(`${this.baseUrl}viewTeam`, null);
  }
  updateTeam(formdata: any): Observable<any>{
    return this.http.post(`${this.baseUrl}updateTeam`, formdata);
  }
  giveAmount(formdata:any): Observable<any>{
    return this.http.post(`${this.baseUrl}giveAmount`, formdata);
  }
  mypointandhistry(formdata:any): Observable<any>{
    return this.http.post(`${this.baseUrl}mypointandhistry`, formdata);

  }
}
