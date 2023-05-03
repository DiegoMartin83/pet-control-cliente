import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Afiliados} from '../models/afiliados';
import { Mascotas } from '../models/mascotas';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../models/userModel';



@Injectable({
  providedIn: 'root'
})
export class AdminService {


  API_URI_USER = 'http://localhost:3000/user'
  API_URI_AFILIADOS ='http://localhost:3000/mascotas'

  API_URI_MASCOTA ='http://localhost:3000/mascotas'

  constructor(private http: HttpClient, private router: Router) { }



  //TAREAS SOBRE EL USUARIO


  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${this.API_URI_USER}/usuario-eliminar/${id}`);
  }

  getUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.API_URI_USER}/listado`);
  }

  getUser(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.API_URI_USER}/${id}`);
  }

  getPetbYiD(id:number):Observable<Mascotas>{
  return this.http.get<Mascotas>(`${this.API_URI_MASCOTA}/animal-nro/${id}`)


}









  // TAREAS SOBRE EL AFILIADO
  addAfiliados(afiliado:any){
    return this.http.post(`${this.API_URI_AFILIADOS}/alta`, afiliado);

  }


  addMascota(mascota:Mascotas):Observable<Mascotas>{
    return this.http.post<Mascotas>(`${this.API_URI_AFILIADOS}/alta`, mascota);

  }

  getAfiliados(){
    return this.http.get(`${this.API_URI_AFILIADOS}/listado`);
  }

  deleteAfiliado(id:number): Observable<void> {
    return this.http.delete<void>(`${this.API_URI_AFILIADOS}/delete/${id}`)
  }


//ME SOLICITA EL ARGUMENTO DEL BODY(???)
  // updateAfiliado(id:any){
  //   return this.http.put(`${this.API_URI_AFILIADOS}/modificar/${id}`)
  // }



  updatePet(id:number, mascota:Mascotas): Observable<void>{
    return this.http.put<void>(`${this.API_URI_AFILIADOS}/actualizar/${id}`,mascota)
  }





}
