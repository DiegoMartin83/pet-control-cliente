import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {





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
  contactUs(){

this.userS.contactUs(this.contact).subscribe(
  res=>{
    let result:any=res;

    Swal.fire(
      'La consulta fue enviada de manera correcta!!'
    )

    this.router.navigate(['inicio']);
  }
)



  }
  }
