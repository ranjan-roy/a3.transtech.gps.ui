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
  allowedRoutes = JSON.parse(this.store.getItem("entitlement")) || [];
  constructor(
    public jwtHelper: JwtHelperService,
    private store: StorageService
  ) {}

  public isAllowed(url: string) {
    const routes = this.allowedRoutes.map((route) => {
      return route.name;
    });
    console.log("route name", routes.includes(url), url);
    return routes.includes(url);
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
