import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(

   private authService: AuthService
  ) { }

  intercept(req: any, next: any) {
    const tokenizeReq = req.clone({
      setHeaders: {
        //Authotization: `Baerer ${this.usuariosService.getToken()}`,
        Authorization: `Baerer ${this.authService.getToken()}`,
      }, withCredentials: true
    })
    return next.handle(tokenizeReq);
  }

}



