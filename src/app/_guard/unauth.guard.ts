import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import Auth from '@aws-amplify/auth';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor( private _router: Router,
               private authenticationService: AuthenticationService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser()
    .then(() => {
      this._router.navigate(['dashboard']);
      return false;
    })
    .catch(() => {
      return true;
    });
  }
}
