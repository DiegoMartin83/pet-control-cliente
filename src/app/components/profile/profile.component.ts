import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';


// enum Perfiles{Adm="Administrativo", Vet="Veterinario"};
// enum Roles{User="User", Admin="Admin" };
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  id = localStorage.getItem('id');

  constructor(private usersService: UsersService, private router: Router) { }


  usuario = { nombre: "", apellido: "", dni: "", telefono: "",celular:"",  domicilio:"", email: "" , rol:"",  password: "" };
  repassword: any = "";

  ngOnInit(): void {

    this.traerData(localStorage.getItem('id'));
    console.log(this.usuario);
  }

  traerData(id: any) {
    this.usersService.getUserData(id).subscribe(
      (res) => {
        let result: any = res;
        console.log(res);
        this.usuario = result;

        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Bienvenido!!!',
        //   detail: result,
        // });
      },
      (err) => {
        ({

        });
        console.log(err.error.message);
      }
    )
  }

  modificarData(update: any) {

    if(this.repassword==""){
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar su clave para realizar esta acción!!',
        showConfirmButton: true,
        confirmButtonColor: '#fc0909e1',
        confirmButtonText: 'Aceptar'

      })

    }

    else {
      if (this.usuario.password == this.repassword) {
        let id = localStorage.getItem('id');
        this.usersService.updateUserData(update, id).subscribe(
          (res) => {
            let result: any = res;
            console.log(result)
            this.ngOnInit();

            Swal.fire({
              icon: 'success',
              title: 'Sus datos han sido actualizados con éxito!',
              showConfirmButton: true,
               confirmButtonColor: '#3AAA2A',
              confirmButtonText: 'Aceptar'

            })
          }
        )
      }
      else {

        Swal.fire({
          icon: 'error',
          title: 'La contraseña ingresada no coincide con su contraseña actual, revísela y vuelva a intentar!',
          showConfirmButton: true,
          confirmButtonColor: '#fc0909e1',
          confirmButtonText: 'Aceptar'

        })
      }

    }

  }

}
