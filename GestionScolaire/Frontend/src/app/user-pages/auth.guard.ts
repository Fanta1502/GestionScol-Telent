import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/auth/login");
      this.authService.deleteToken();
      return false;
    }
    return true;
  }
}
