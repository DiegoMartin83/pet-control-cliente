import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  contact =
  {
    nombreyapellido:"",
    telefono:"",
    email:"",
    consulta:""
  };


  constructor(private userS: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  contacto(){

    this.userS.contactUs(this.contact).subscribe(
      res=>{
        let result:any=res;
        console.log(result.message);

        Swal.fire(
          'La consulta fue enviada de manera correcta!!'
        )

        this.router.navigate(['index']);
      }
    )



      }

}
