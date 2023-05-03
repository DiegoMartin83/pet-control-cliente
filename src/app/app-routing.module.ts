import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {WorkingComponent} from './components/working/working.component';
import {HomeComponent} from './components/home/home.component';
import {IndexComponent} from './components/index/index.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RegisterConfirmComponent} from './components/register-confirm/register-confirm.component';
import {AboutComponent} from './components/about/about.component';
import {ForgotPwdComponent} from './components/forgot-pwd/forgot-pwd.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { TurnoslistComponent } from './components/turnoslist/turnoslist.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import {UserstasksComponent} from './components/userstasks/userstasks.component';
import { AfiliadostasksComponent } from './components/afiliadostasks/afiliadostasks.component';
import { UsersHomeComponent } from './components/users-home/users-home.component';
import {MascotasComponent} from './components/mascotas/mascotas.component';
import { MascotaslistComponent } from './components/mascotaslist/mascotaslist.component';
import { HclistComponent } from './components/hclist/hc.component';
import { UsersComponent } from './components/users/users.component';



const routes: Routes = [


  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {

    path:'inicio',
    component:InicioComponent

  },

  {

    path:'admin/usuarios',
    component: UserstasksComponent,
    canActivate:[AuthGuard]

  },

  {
    path: 'admin/afiliados',
    component: AfiliadostasksComponent,
    canActivate:[AuthGuard]
  },


  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/createAccount',
    component: RegisterComponent,


  },
  {
    path: 'users/home',
    component: UsersHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'auth/confirm',
    component: RegisterConfirmComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'user/profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin/home',
    component: HomeComponent,
    canActivate:[AuthGuard]
},

  {
      path:'about',
      component: AboutComponent,
  },
  {
     path:'contacto',
     component: ContactoComponent,
  },
  {
    path:'auth/forgot',
    component: ForgotPwdComponent,
  },
  {
    path:'user/perfil',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'turnos',
    component: TurnosComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'nuevo-turno',
    component: TurnosComponent,
    canActivate:[AuthGuard]
  },
  {path:'listado' ,
   component: TurnoslistComponent,
   canActivate:[AuthGuard]
   },

  {path:'construccion',
  component: WorkingComponent,
  canActivate:[AuthGuard]
  },

  {path: 'nuevo-afiliado',
  component: AfiliadosComponent,
  canActivate:[AuthGuard]
  },

  {path:'nueva-mascota',
   component:MascotasComponent,
   canActivate:[AuthGuard]
  },
  { path: 'mascotas-listado',
    component: MascotaslistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'fichas-listado',
    component: HclistComponent,
    canActivate:[AuthGuard]
  },

  {

    path:'usuarios-listado',
    component:UsersComponent,
    canActivate:[AuthGuard]


  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
