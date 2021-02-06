import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { observable, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AlarmService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeviceByUserId(id): Observable<any> {
    return this.http.get<any>(`${this.url}/Device/GetByUser/${id}`);
  }

  getAllVehicleType(): Observable<any> {
    return this.http.get<any>(`${this.url}/VehicleType/`);
  }
  getAllDeviceType(): Observable<any> {
    return this.http.get<any>(`${this.url}/DeviceType/`);
  }
  getAllAlarmType(): Observable<any> {
    return this.http.get<any>(`${this.url}/AlarmType/`);
  }

  getAlarmStatus(): Observable<any> {
    return this.http.get<any>(`${this.url}/AlarmStatus/`);
  }

  getDeviceAlarmByDeviceId(deviceId): Observable<any> {
    return this.http.get<any>(`${this.url}/DeviceAlarm/${deviceId}`);
  }

  getOperator(): Observable<any> {
    return this.http.get<any>(`${this.url}/Operator`);
  }

  postAlarm(payload): Observable<any> {
    return this.http.post<any>(`${this.url}/DeviceAlarm`, payload);
  }

  putAlarm(deviceId, payload): Observable<any> {
    return this.http.put<any>(`${this.url}/DeviceAlarm/${deviceId}`, payload);
  }

  deleteAlarm(deviceId): Observable<any> {
    return this.http.delete<any>(`${this.url}/DeviceAlarm/${deviceId}`);
  }
}
