
import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder,Validators} from '@angular/forms';
import { Location } from '@angular/common';






@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  mascotasForm = this.formA.group({
    emailDueño: ['', [Validators.required, Validators.email]],
    nombre: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      especie: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      raza: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      color: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      sexo: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    nombreDueño: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    apellidoDueño: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    dniDueño: ['',
      [Validators.required,
      Validators.maxLength(9),
      Validators.minLength(7),
      Validators.pattern(/^[0-9]/)]],
    telefonoDueño: ['',
      [Validators.required,
      Validators.maxLength(10),
      Validators.minLength(8),
      Validators.pattern(/^[0-9]/)]],
    domicilioDueño: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],

  });

  constructor(private adminService: AdminService, private router: Router, protected formA:FormBuilder, private location: Location) { }



  mascota = {nombre:"", especie:"", raza:"", color:"", sexo:"", nombreDueño:"", apellidoDueño:"", dniDueño:"", domicilioDueño:"", telefonoDueño:"", emailDueño:""};
  mascotas: any = [];




  ngOnInit(): void {
  }

  listarmascotas(){


    this.adminService.getAfiliados().subscribe(
      res=> {
        this.mascotas=res;
        console.log(res);

      },
      err => console.log(err)
    )
  }

  altaMascota() {

    this.mascota.nombre = this.mascotasForm.get(['nombre'])!.value;
    console.log(this.mascota.nombre);
    this.mascota.especie = this.mascotasForm.get(['especie'])!.value;
    console.log(this.mascota.especie);
    this.mascota.raza = this.mascotasForm.get(['raza'])!.value;
    console.log(this.mascota.raza);
    this.mascota.color = this.mascotasForm.get(['color'])!.value;
    console.log(this.mascota.color);
    this.mascota.sexo = this.mascotasForm.get(['sexo'])!.value;
    console.log(this.mascota.sexo);

    this.mascota.nombreDueño = this.mascotasForm.get(['nombreDueño'])!.value;
    console.log(this.mascota.nombreDueño);
    this.mascota.apellidoDueño = this.mascotasForm.get(['apellidoDueño'])!.value;
    console.log(this.mascota.apellidoDueño);
    this.mascota.dniDueño = this.mascotasForm.get(['dniDueño'])!.value;
    console.log(this.mascota.dniDueño);
    this.mascota.telefonoDueño = this.mascotasForm.get(['telefonoDueño'])!.value;
    console.log(this.mascota.telefonoDueño);
    this.mascota.domicilioDueño = this.mascotasForm.get(['domicilioDueño'])!.value;
    console.log(this.mascota.domicilioDueño);
    this.mascota.emailDueño = this.mascotasForm.get(['emailDueño'])!.value;
    console.log(this.mascota.emailDueño);

    console.log("Alta mascota");
    console.log(this.mascota);

      this.adminService.addMascota(this.mascota).subscribe(
        res => {
          let result: any = res;
          console.log(result.message);
          Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Se ha añadido la mascota satisfactoriamente!',
            showConfirmButton: true,
            timer:3500

          })

          this.router.navigate(['admin/home']);
        },
        err => {
          console.log(err.error.message);
          Swal.fire('Error', err.error.message, 'error');
        }
      )



      // Swal.fire({
      //   icon: 'error',
      //   showLoaderOnConfirm: true,
      //   title: '',
      //   confirmButtonColor: '#fc0909e1',
      //   showConfirmButton: true,

      // })


  }

  goBack() {
    this.location.back();
  }
}




