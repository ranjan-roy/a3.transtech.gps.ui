import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getNotification(): Observable<any> {
    return this.http.get<any>(`${this.url}/Notification`);
  }
  markRead(payload: number[]): Observable<any> {
    return this.http.post<any>(`${this.url}/Notification/MarkRead`, payload);
  }
}
