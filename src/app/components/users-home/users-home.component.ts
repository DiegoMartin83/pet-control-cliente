import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {

  getAnio:number;
  rol: any = "";
  constructor(private authService: AuthService, private router: Router) {


    this.getAnio = new Date().getFullYear();
   }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
   console.log(this.rol);
  }

}
