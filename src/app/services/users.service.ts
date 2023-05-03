import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {Usuario} from '../models/userModel'
import { Turnos } from '../models/turnosModel';
import { HistoriaClinica } from '../models/historiaClinica';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/user';
  API_URI_TURNOS = 'http://localhost:3000/turnos';
  API_URI_PETS= 'http://localhost:3000/mascotas';
  API_URI_AUX = 'http://localhost:3000/contacto';
  API_URI_HC = 'http://localhost:3000/fichas';

  constructor(private http: HttpClient, private router: Router) { }

  //Perfil Usuario
  getUserData(id:string){
    return this.http.get(`${this.API_URI}/datos/${id}`);
  }


  //PROBLEMA UPDATE PERFIL
  updateUserData(update:Usuario, id:any):Observable<any> {
    // return this.http.put(`${this.API_URI}/perfil`, update)
    return this.http.put(`${this.API_URI}/perfil/${id}`, update)
  }
//Control Fichas

// addFile(file:any){
//   return this.http.post(`${this.API_URI}`, file)
// }

addFile(file:HistoriaClinica):Observable<HistoriaClinica>{
  return this.http.post<HistoriaClinica>(`${this.API_URI}/alta`, file)
}



getFileByID(id:number):Observable<HistoriaClinica>{
  return this.http.get<HistoriaClinica>(`${this.API_URI_HC}/ficha-nro/${id}`)
}





listFiles():Observable<HistoriaClinica[]>{
  return this.http.get<HistoriaClinica[]>(`${this.API_URI_HC}/listado`)

}

updateFile(id:number, hc:HistoriaClinica): Observable<void>{

  return this.http.put<void>(`${this.API_URI_HC}/actualizar/${id}`,hc)
}
//Control
  contactUs (contact:any){
    return this.http.post(`${this.API_URI_AUX}/consulta`, contact);
  }






  //Control TurnosComponent

  // listTurns(){
  //   return this.http.get(`${this.API_URI_TURNOS}/listado`);
  // }


  addTurn(turno:Turnos):Observable<Turnos>{
    return this.http.post<Turnos>(`${this.API_URI_TURNOS}/nuevo`, turno)
  }
  // addTurn(turno:any){
  //   return this.http.post(`${this.API_URI_TURNOS}/nuevo`, turno)
  // }
  listTurns():Observable<Turnos[]>{
    return this.http.get<Turnos[]>(`${this.API_URI_TURNOS}/listado`);
  }



  //  getTurn(id:number): Observable<Turnos>{
  //   return this.http.get<Turnos>(`${this.API_URI_TURNOS}/visita-nro/${id}`);
  // }

  getTurnByID(id:number):Observable<Turnos>{
    return this.http.get<Turnos>(`${this.API_URI_TURNOS}/visita-nro/${id}`);
  }

// updateTurn(id:number, turno:Turnos):Observable<void>{
//   return this.http.put<void>(`${this.API_URI_TURNOS}/modificar/:id`, id, turno)

// }

updateTurn(id:number, turno:Turnos): Observable<void>{
  return this.http.put<void>(`${this.API_URI_TURNOS}/modificar/${id}`,turno)
}


  //Control Mascotas

  getPets(){
    return this.http.get(`${this.API_URI_PETS}/listado`);
  }
}


