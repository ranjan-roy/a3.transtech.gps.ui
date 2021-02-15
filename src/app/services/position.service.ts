import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PositionService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVehicleSummary({ startDate, endDate }): Observable<any> {
    return this.http.get<any>(
      `${this.url}/Position/DeviceSummary/${startDate}/${endDate}`
    );
  }

  getPositionData({ deviceId, startDate, endDate }): Observable<any> {
    return this.http.get<any>(
      `${this.url}/Position/${deviceId}/${startDate}/${endDate}`
    );
  }
}
