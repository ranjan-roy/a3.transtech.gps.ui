import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private store: StorageService
  ) {}

  get allowedRoutes() {
    return JSON.parse(this.store.getItem("entitlement")) || [];
  }

  public isAllowed(url: string) {
    const routes = this.allowedRoutes.map((route) => {
      return route.name;
    });
    const defaultAllowedRouts = ["", "Dashboard"];
    const isValid = URL
      ? defaultAllowedRouts.includes(url) || routes.includes(url)
      : true;
    return isValid;
  }

  public getActions(url: string) {
    const actions = this.allowedRoutes.filter((item) => url === item.name);
    return actions && actions.length ? actions[0].permissions : [];
  }

  public isAuthenticated(): boolean {
    const token = this.store.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
