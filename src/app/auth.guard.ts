import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from './services/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    // private  authAdmService:AdminService,
    private oAuthService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.oAuthService.loggedTrue()) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }

}
