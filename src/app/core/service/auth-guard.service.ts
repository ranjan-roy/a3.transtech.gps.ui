import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  url = "Vendor";
  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated() || !this.auth.isAllowed(this.url)) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
