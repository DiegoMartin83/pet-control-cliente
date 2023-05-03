import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService) { }


  logIn:boolean=false;
  admin:boolean=false;
  user_:boolean=false;

  id_Rol = localStorage.getItem('rol');
  user = { usuario: "", password: "" };


  ngOnInit(): void {

    this.authService.loged$.subscribe(log => {
      this.logIn = true;
      this.id_Rol = localStorage.getItem('rol');
    })

  }



  logout() {

    this.authService.logOut();
    this.logIn=false;

  }
}
