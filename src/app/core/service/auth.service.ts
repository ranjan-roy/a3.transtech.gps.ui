import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from './storage.service';
@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService, private store: StorageService) { }

    public isAllowed() {
        return true;
    }

    public isAuthenticated(): boolean {
        const token = this.store.getToken();
        return !this.jwtHelper.isTokenExpired(token);
    }
}