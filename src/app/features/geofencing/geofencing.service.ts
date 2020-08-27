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
  geGeofenceByUser(id): Observable<any> {
    return this.http.get<any>(`${this.url}/Geofence/GetByUser/${id}`);
  }
  deleteGeofence(id) {
    return this.http.delete(`${this.url}/Geofence/${id}`);
  }
  getGroupIdByUser(id): Observable<any> {
    return this.http.get<any>(`${this.url}/Group/GetByUser/${id}`);
  }

  addGeofenceToGroup(payload): Observable<any> {
    return this.http.post<any>(`${this.url}/GeofenceGroup`, payload);
  }

  deleteGeofenceGroup(geofenceId, groupId) {
    return this.http.delete(
      `${this.url}/GeofenceGroup/${geofenceId}/${groupId}`
    );
  }
  updateGeofence(geofenceId, payload): Observable<any> {
    return this.http.put<any>(`${this.url}/Geofence/${geofenceId}`, payload);
  }
}
