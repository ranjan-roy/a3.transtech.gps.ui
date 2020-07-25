import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginPayload } from './interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.url}/Auth/authenticate`, payload);
  }
}
