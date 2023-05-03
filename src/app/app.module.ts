import { NgModule, CUSTOM_ELEMENTS_SCHEMA,LOCALE_ID } from '@angular/core';
import { SidebarModule } from 'ng-sidebar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';
import { UsersHomeComponent } from './components/users-home/users-home.component';
import { TurnosComponent } from './components/turnos/turnos.component';
 import { MascotasComponent } from './components/mascotas/mascotas.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { AboutComponent } from './components/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { AccountComponent } from './components/account/account.component';
import { ForgotPwdComponent } from './components/forgot-pwd/forgot-pwd.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {registerLocaleData} from '@angular/common';
import localEs from '@angular/common/locales/es-AR';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
import { WorkingComponent } from './components/working/working.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AfiliadostasksComponent } from './components/afiliadostasks/afiliadostasks.component';
import { UserstasksComponent } from './components/userstasks/userstasks.component';
import { HctasksComponent } from './components/hctasks/hctasks.component';
import { TurnostasksComponent } from './components/turnostasks/turnostasks.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FilesComponent } from './components/files/files.component';
import { TurnoslistComponent } from './components/turnoslist/turnoslist.component';
import { MascotaslistComponent } from './components/mascotaslist/mascotaslist.component';



/*Material*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import  {MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
 import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HclistComponent } from './components/hclist/hc.component';
import { MascotastasksComponent } from './components/mascotastasks/mascotastasks.component';



registerLocaleData(localEs);

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    UsersComponent,
    UsersHomeComponent,
    TurnosComponent,
    MascotasComponent,
    EstudiosComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegisterConfirmComponent,
    AboutComponent,
    SidebarComponent,
    ForgotPwdComponent,
    AfiliadosComponent,
    ProfileComponent,
    ContactoComponent,
    AdminComponent,
    WorkingComponent,
    InicioComponent,
    AfiliadostasksComponent,
    UserstasksComponent,
    HctasksComponent,
    TurnostasksComponent,
    FilesComponent,
    TurnoslistComponent,
    MascotaslistComponent,
    HclistComponent,
    MascotastasksComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCaptchaModule,
    TimepickerModule.forRoot(),

    //Material
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule



  ],
  providers: [
    AuthService,
    AuthGuard,
     {
       provide: [HTTP_INTERCEPTORS , LOCALE_ID],
       useValue: 'es-AR',
       useClass: TokenInterceptorService,
       multi: true,


     }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
