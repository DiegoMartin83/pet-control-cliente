import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Mascotas} from '../models/mascotas';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  API_URI_PET = 'http://localhost:3000/mascotas';

  constructor(private http: HttpClient, private router: Router) { }

  //TAREAS SOBRE EL USUARIO


  getPets(pets:any){
    return this.http.get(`${this.API_URI_PET}/listado`, pets);
  }

  gePet(id:any){
    return this.http.get(`${this.API_URI_PET}/animal-nro/${id}`);
  }




  // TAREAS SOBRE LA MASCOTA
  addPets(pet:any){
    return this.http.post(`${this.API_URI_PET}/alta`, pet);
  }



  deletePet(id:any){
    return this.http.delete(`${this.API_URI_PET}/delete/${id}`)
  }


//ME SOLICITA EL ARGUMENTO DEL BODY(???)
  // updateAfiliado(id:any){
  //   return this.http.put(`${this.API_URI_AFILIADOS}/modificar/${id}`)
  // }



  updatePet(id:any, pet:any){
    return this.http.put(`${this.API_URI_PET}/actualizar/${id}`,pet)
  }

}
