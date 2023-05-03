import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {


  turnosForm = this.formT.group({


  })

  constructor(private userS: UsersService, private router: Router, protected formT:FormBuilder) { }

  turno = {fechaVisita:"", horaVisita:"", nombre_mascota:"",id_mascota:"", idProfesional:""};
  turnos =[];

  listarTurnos(){

  }

  ngOnInit(): void {
  }

}
