import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'petControlClient';


  constructor(private oAuthService: AuthService) { }
  logIn: boolean = false;
  idRol = localStorage.getItem("rol");


  ngOnInit(): void {
    this.oAuthService.loged$.subscribe(log => {
      this.logIn = true;
      this.idRol = localStorage.getItem('rol');
    })
  }
}







