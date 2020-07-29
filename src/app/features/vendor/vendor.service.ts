import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginPayload } from '../../core/service/interface';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVendor(): Observable<any> {
    return this.http.get<any>(`${this.url}/Vendor`);
  }

  addVendor(payload) {

    return this.http.post(`${this.url}/Vendor`, payload);
  }

  addProfile(payload) {
    return this.http.post(`${this.url}/Profile`, payload);
  }

  addUser(payload) {
    return this.http.post(`${this.url}/User`, payload);
  }
}
