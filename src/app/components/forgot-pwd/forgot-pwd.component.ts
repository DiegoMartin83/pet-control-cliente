import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import { AbstractControl,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  isLogin = false;
  loginForm = this.fb.group({
  //ahora lo descomento
    // recaptcha: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.email]],
  });
  user = {usuario: ""};




  constructor(private oAuthService: AuthService, private router: Router , protected fb: FormBuilder) { }

  ngOnInit(): void {
  }


  forgotPwd(){

  }

}
