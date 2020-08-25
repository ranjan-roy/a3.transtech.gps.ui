import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeofencingService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postGeofence(payload): Observable<any> {
    return this.http.post<any>(`${this.url}/Geofence`, payload);
  }
}