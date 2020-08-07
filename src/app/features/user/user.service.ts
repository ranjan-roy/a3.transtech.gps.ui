import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersByVendorId(id): Observable<any> {
    return this.http.get<any>(`${this.url}/User/GetByVendor/${id}`);
  }

  postUser(user): Observable<any> {
    return this.http.post<any>(`${this.url}/User`, user);
  }
  updateUser(user): Observable<any> {
    return this.http.put<any>(`${this.url}/User/${user.userId}`, user);
  }

  addProfile(payload) {
    return this.http.post(`${this.url}/Profile`, payload);
  }

  addUser(payload) {
    return this.http.post(`${this.url}/User`, payload);
  }

  addGroup(userName) {
    const payload = {
      groupId: 0,
      name: `${userName} Group`,
      description: `Group for ${userName}`,
      accessLevel: 3,
    };
    return this.http.post(`${this.url}/Group`, payload);
  }

  addUserGroup(userId, groupId) {
    const payload = {
      userId: userId,
      groupId: groupId,
    };
    return this.http.post(`${this.url}/UserGroup`, payload);
  }
}
