import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ DatePipe],

})
export class RegisterComponent implements OnInit {






isLogin = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    apellido: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    dni: ['',
      [Validators.required,
      Validators.maxLength(9),
      Validators.minLength(7),
      Validators.pattern(/^[0-9]/)]],
    telefono: ['',
      [Validators.required,
      Validators.maxLength(10),
      Validators.minLength(8),
      Validators.pattern(/^[0-9]/)]],
      celular: ['',
      [Validators.required,
      Validators.maxLength(10),
      Validators.minLength(8),
      Validators.pattern(/^[0-9]/)]],
      domicilio: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      rol: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
      perfil: ['',
      [Validators.required,
      Validators.maxLength(14),
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][A-Za-z]/)]],
    password: ['',
      [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6),
      Validators.pattern(/^[A-Z][A-Za-z0-9]/)]],
    repassword: ['',
      [Validators.required,
      Validators.maxLength(20),
      Validators.minLength(6),
      Validators.pattern(/^[A-Z][A-Za-z0-9]/)]],
  });
  user = { nombre: "", apellido: "", dni: "", telefono: "", celular:"", domicilio:"",  email: "", rol:"", perfil:"",  password: ""};

  repassword: any = "";

  siteKey:string;
  Size:string;
  isCheck:boolean=false;

  constructor(private oAuthService: AuthService,
    private router: Router,
    protected fb: FormBuilder,private cdr: ChangeDetectorRef
    ) {

      this.siteKey='6LdHTrwdAAAAACalHLJ-TDIVDTHOR8jP91yFEVLN'
      this.Size='Compact'
    }

  ngOnInit(): void {
  }

  register() {
    this.isLogin = true;
    this.user.nombre = this.loginForm.get(['nombre'])!.value;
    console.log(this.user.nombre);
    this.user.apellido = this.loginForm.get(['apellido'])!.value;
    console.log(this.user.apellido);
    this.user.dni = this.loginForm.get(['dni'])!.value;
    console.log(this.user.dni);
    this.user.telefono = this.loginForm.get(['telefono'])!.value;
    console.log(this.user.telefono);
    this.user.celular = this.loginForm.get(['celular'])!.value;
    console.log(this.user.celular);
    this.user.domicilio = this.loginForm.get(['domicilio'])!.value;
    console.log(this.user.domicilio);
    this.user.rol = this.loginForm.get(['rol'])!.value;
    console.log(this.user.rol);
    this.user.perfil = this.loginForm.get(['perfil'])!.value;
    console.log(this.user.perfil);
    this.user.email = this.loginForm.get(['email'])!.value;
    console.log(this.user.email);
    this.user.password = this.loginForm.get(['password'])!.value;
    console.log(this.user.password);
    this.repassword = this.loginForm.get(['repassword'])!.value;
    console.log(this.user.password);
    console.log("Sign Up");
    console.log(this.user);
    if (this.user.password == this.repassword) {
      this.oAuthService.createAccount(this.user).subscribe(
        res => {
          let result: any = res;
          console.log(result.message);
          Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Registro exitoso, revise su casilla de correo!',
            showConfirmButton: true,
            timer: 2500
          })
          // window.alert('El registro se completó satisfactoriamente, se envió un correo de confirmación de registro a tu casila!!')
          this.router.navigate(['auth/confirm']);
        },
        err => {
          console.log(err.error.message);
          Swal.fire('Error', err.error.message, 'error');
        }
      )
    }
    else {
      this.isLogin = false;
      Swal.fire({
        icon: 'error',
        showLoaderOnConfirm: true,
        title: 'Las claves no coinciden!',
        showConfirmButton: true,
        timer: 2500
      })

    }
  }


  confirm(cnf:any){

    this.isCheck=true;
    this.cdr.detectChanges();
  }
 }

