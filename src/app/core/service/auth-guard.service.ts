import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  UrlSegment,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { StorageService } from "./storage.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private store: StorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    if (this.validateUserRole(route.url)) {
      return true;
    }
  }

  validateUserRole(url: string[] | UrlSegment[]): boolean {
    const routePath = url[0];
    const allowedRoutes = JSON.parse(this.store.getItem("entitlement")) || [];
    const routes = allowedRoutes.map((route) => {
      return route.name;
    });
    const defaultAllowedRouts = ["", "Dashboard"];
    const URL = routePath ? routePath["path"] : "";
    const isValid = URL
      ? defaultAllowedRouts.includes(URL) || routes.includes(URL)
      : true;
    return isValid;
  }
}
