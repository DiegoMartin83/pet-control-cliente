import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Usuario } from '../models/userModel';
// import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/auth';
  API_URI_u= 'http://localhost:3000/user';



  admin_ = new EventEmitter<string>();
  user$= new EventEmitter<string>();
  loged$ = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) {

  }

  loggedTrue():Boolean{
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logIn(user:any){

      return this.http.post(`${this.API_URI}/signin`, user);

  }

  createAccount(user:any) {

    return this.http.post(`${this.API_URI}/signup`, user);

  }
  getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');

  }

forgotPwd(user:any){

  return this.http.put(`${this.API_URI}/forgot`, user)
}
// updateDataUser(date: Usuario): Observable<any> {
//   return this.http.put(`${this.API_URI_u}/perfil`, date);
// }

  logOut() {

    // let ok:boolean;

    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['inicio']);

    // Swal.fire({
    //   icon: 'success',

    //   title: ['Saliendo...</br>  Gracias por utilizar Pet Control!!'],
    //   showConfirmButton: false,
    //   timer: 3000
    // })
    // Swal.fire({
    //   title: 'Desea salir del sistema?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   cancelButtonText:'Cancelar',
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Aceptar!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     ok=true;
    //     Swal.fire(
    //       'Saliendo...!',
    //       'Gracias por utilizar Pet Control!!',
    //       'success'

    //     )
    // Swal.fire(
    //   'Saliendo...',
    //   'Gracias por utilizar Pet Control!!',
    //   'success'

    // )
    Swal.fire({
      icon: 'success',
      showLoaderOnConfirm: true,
      title: 'Saliendo... <hr> Gracias por utilizar Pet Control!!',
      showConfirmButton: false,
      timer: 3500
    })

          // localStorage.removeItem('token');
          // localStorage.removeItem('rol');
          // this.router.navigate(['index']);


      }
    }





