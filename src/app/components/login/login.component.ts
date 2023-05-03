import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { AbstractControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = false;
  loginForm = this.fb.group({
  //ahora lo descomento
    // recaptcha: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,15}$'),
      ],
    ],
  });
  user = {usuario: "", password: "", recaptcha:""};
  siteKey:string;
  Size:string;
  // recaptcha:any;
  isCheck:boolean=false;
  constructor(
    private oAuthService: AuthService, private router: Router,  protected fb: FormBuilder, private cdr: ChangeDetectorRef
  ) {


    this.siteKey='6LdHTrwdAAAAACalHLJ-TDIVDTHOR8jP91yFEVLN'
    this.Size='Compact'
  }

  ngOnInit(): void {


   }

  //this.user.recaptcha= this.loginForm.get(['recaptcha'])!.value;
  login() {

    this.isLogin = true;
    this.user.usuario= this.loginForm.get(['usuario'])!.value;
    console.log(this.user. usuario);
    this.user.password= this.loginForm.get(['password'])!.value;
    console.log(this.user.password);

if(!this.isCheck){
  console.log("No verificado!")
  return;
}

if(this.isCheck){
  console.log("Verificado!")
}
    this.oAuthService.logIn(this.user).subscribe(
      res => {
        let result: any = res;
        console.log(result);
        localStorage.setItem('id', result.id);
        localStorage.setItem('token', result.token);
        localStorage.setItem('rol', result.rol);
        // localStorage.setItem('token', result.token);
        localStorage.setItem('perfil', result.perfil);
        this.oAuthService.loged$.emit();
        // this.isLogin = false;

        Swal.fire({
          icon: 'success',
          showLoaderOnConfirm: true,
          title: 'Validando...',
          showConfirmButton: false,
          timer: 2500
        })
        if (result.rol == "Admin" || result.rol == "admin") {

          this.oAuthService.admin_.emit();
          console.log(result);
          this.router.navigate(['admin/home'])
         }else{
          this.oAuthService.user$.emit();
          console.log(result.rol);
          this.router.navigate(['users/home']);
         }





      },
      err => {
        // Swal.fire({
        //   icon: 'error',
        //   showLoaderOnConfirm: true,
        //   title: 'Usuario o clave incorrectos',
        //   showConfirmButton: true,
        //   timer: 2500
        // })
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrectos',
          showConfirmButton: true,
          confirmButtonColor: '#fc0909e1',
          confirmButtonText: 'Aceptar'

        })
        console.log(err.error.message);
        this.isLogin = false;
      }
    );

  }
confirm(cnf:any){

  this.isCheck=true;
  this.cdr.detectChanges();
}

}
