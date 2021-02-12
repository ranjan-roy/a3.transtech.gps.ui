import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeviceByUserId(id): Observable<any> {
    console.log("getDeviceByUserId", id);

    return this.http.get<any>(`${this.url}/Device/GetByUser/${id}`);
  }

  getAllVehicleType(): Observable<any> {
    return this.http.get<any>(`${this.url}/VehicleType/`);
  }

  getAllDeviceType(): Observable<any> {
    return this.http.get<any>(`${this.url}/DeviceType/`);
  }

  addDevice(payload) {
    return this.http.post(`${this.url}/Device`, payload);
  }

  deleteDevice(user) {
    return this.http.delete(`${this.url}/Device/${user.deviceId}`);
  }
  getGroupIdByUser(id): Observable<any> {
    return this.http.get<any>(`${this.url}/Group/GetByUser/${id}`);
  }

  addDeviceGroup(payload): Observable<any> {
    return this.http.post<any>(`${this.url}/DeviceGroup`, payload);
  }
  updateDevice(payload) {
    return this.http.put(`${this.url}/Device/${payload.deviceId}`, payload);
  }
  getDevicePosition(): Observable<any> {
    return this.http.get<any>(`${this.url}/Device/GetDevicePosition`);
  }
}
