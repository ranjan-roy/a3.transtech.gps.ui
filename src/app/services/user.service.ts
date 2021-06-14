import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersByVendorId(id): Observable<any> {
    return this.http.get<any>(`${this.url}/User/GetByVendor/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.url}/User/CurrentUser`);
  }

  getAccessableUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/User/Get`);
  }

  postUser(user): Observable<any> {
    return this.http.post<any>(`${this.url}/User`, user);
  }
  updateUser(user): Observable<any> {
    return this.http.patch<any>(`${this.url}/User/${user.userId}`, user);
  }

  addProfile(payload) {
    return this.http.post(`${this.url}/Profile`, payload);
  }

  addUser(payload) {
    return this.http.post(`${this.url}/User`, payload);
  }

  deleteUser(user) {
    return this.http.delete(`${this.url}/User/${user.userId}`);
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
  updateUserFields(userId, payload): Observable<any> {
    return this.http.patch<any>(`${this.url}/User/${userId}`, payload);
  }
  updateProfilePicture(formData: any) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    let options = { headers: headers, responseType: "text" as const };

    return this.http
      .put(`${this.url}/User/UpdateProfilePicture`, formData, options)
      .pipe(map((data) => data));
  }
}
