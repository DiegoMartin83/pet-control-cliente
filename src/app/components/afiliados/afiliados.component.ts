import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder,Validators} from '@angular/forms';


@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit {

  afiliadosForm = this.formA.group({
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
       fechaDeNacimiento: ['',
       [Validators.required]],
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

  constructor(private adminService: AdminService, private router: Router, protected formA:FormBuilder) { }


  afiliado = {nombre:"", especie:"", raza:"", color:"", sexo:"", fechaDeNacimiento:"",nombreDuenio:"", apellidoDuenio:"", dniDuenio:"", domicilioDuenio:"", telefonoDuenio:"", emailDuenio:""};
  afiliados: any = [];




  ngOnInit(): void {
  }

  listarAfiliados(){


    this.adminService.getAfiliados().subscribe(
      res=> {
        this.afiliados=res;
        console.log(res);

      },
      err => console.log(err)
    )
  }

  altaAfiliado() {

    this.afiliado.nombre = this.afiliadosForm.get(['nombre'])!.value;
    console.log(this.afiliado.nombre);

    this.afiliado.especie = this.afiliadosForm.get(['especie'])!.value;
    console.log(this.afiliado.especie);

    this.afiliado.raza = this.afiliadosForm.get(['raza'])!.value;
    console.log(this.afiliado.raza);

    this.afiliado.color = this.afiliadosForm.get(['color'])!.value;
    console.log(this.afiliado.color);

    this.afiliado.sexo = this.afiliadosForm.get(['sexo'])!.value
    console.log(this.afiliado.sexo);

    this.afiliado.fechaDeNacimiento = this.afiliadosForm.get(['fechaDeNacimiento'])!.value;
     console.log(this.afiliado.fechaDeNacimiento);

    this.afiliado.nombreDuenio = this.afiliadosForm.get(['nombreDuenio'])!.value
    console.log(this.afiliado.nombreDuenio);


    this.afiliado.apellidoDuenio = this.afiliadosForm.get(['apellidoDueño'])!.value;
    console.log(this.afiliado.apellidoDuenio);

    this.afiliado.dniDuenio = this.afiliadosForm.get(['dniDueño'])!.value;
    console.log(this.afiliado.dniDuenio);

    this.afiliado.telefonoDuenio = this.afiliadosForm.get(['telefonoDueño'])!.value;
    console.log(this.afiliado.telefonoDuenio);
    this.afiliado.domicilioDuenio = this.afiliadosForm.get(['domicilioDueño'])!.value;
    console.log(this.afiliado.domicilioDuenio);
    this.afiliado.emailDuenio = this.afiliadosForm.get(['emailDueño'])!.value;
    console.log(this.afiliado.emailDuenio);

    console.log("Alta afiliado");
    console.log(this.afiliado);

      this.adminService.addAfiliados(this.afiliado).subscribe(
        res => {
          let result: any = res;
          console.log(result.message);
          Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Se ha añadido el afiliado satisfactoriamente!',
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


}
