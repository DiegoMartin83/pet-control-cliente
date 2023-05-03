import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascotas } from 'src/app/models/mascotas';
import { UsersService } from 'src/app/services/users.service';
import { DateAdapter } from '@angular/material/core';
import { InjectFlags } from '@angular/compiler/src/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotastasks',
  templateUrl: './mascotastasks.component.html',
  styleUrls: ['./mascotastasks.component.css']
})
export class MascotastasksComponent implements OnInit {
form:FormGroup;
minDate:Date;
loading:boolean=false;
modo:string = 'Agregar ';
id:number | undefined;

  pets:number[] = [];

  constructor(public dialogRef: MatDialogRef<MascotastasksComponent>,
    private fb: FormBuilder, private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any ,private adminS: AdminService) {
      // this.minDate = moment(new Date()).format('YYYY-MM-DD')
      this.minDate = new Date()





      this.form=this.fb.group({
        nombre:['',Validators.required],
        especie:['', Validators.required],
        raza:['',Validators.required],
        color:['',Validators.required],
        sexo:['',[Validators.required,Validators.minLength(1),
        Validators.maxLength(4)]],
        fechaDeNacimiento:['',Validators.required],
        nombreDuenio:['',[Validators.required]],
        apellidoDuenio:['',[Validators.required]],
        dniDuenio:['',[Validators.required,Validators.minLength(7),
        Validators.maxLength(8)]],
        telefonoDuenio:['',[Validators.required,Validators.minLength(7),
        Validators.maxLength(10)]],
        domicilioDuenio:['',[Validators.required]],
        emailDuenio:['',[Validators.required]]

      })
      this.id=data.id;
       dateAdapter.setLocale('es');

console.log("Modal", data);
    }

    // turno={fechaVisita: "", horaVisita: "", nombre_mascota:"",id_mascota:"",idProfesional:"", estado:""}
  ngOnInit(): void {
    this.itsEdit(this.id);
  }

itsEdit(id:number| undefined){
if (id !== undefined){
  this.modo = 'Editar ';
  this.traerMascota(id);
  }
}








traerMascota(id: number){
this.adminS.getPetbYiD(id).subscribe(data=>{
  console.log(data);
  this.form.patchValue({
    idAnimal: data.idAnimal,
    nombre: data.nombre,
    especie: data.especie,
    raza: data.raza,
    sexo: data.sexo,
    color: data.color,
    fechaDeNacimiento: data.fechaDeNacimiento,
    nombreDuenio: data.nombreDuenio,
    apellidoDuenio: data.apellidoDuenio,
    dniDuenio: data.dniDuenio,
    telefonoDuenio: data.telefonoDuenio,
    domicilioDuenio: data.domicilioDuenio,
    emailDuenio: data.emailDuenio,

  })
})
}
  addPetsTasks(){

    if(this.form.invalid){
      console.log("Formulario inválido!")
      return;
    }
    console.log(this.form)

    const mascotas: Mascotas = {

      idAnimal: this.form.value.idAnimal,
      nombre:this.form.value.nombre,
      especie:this.form.value.especie,
      raza:this.form.value.raza,
      color:this.form.value.color,
      sexo:this.form.value.sexo,
      fechaDeNacimiento: this.form.value.fechaDeNacimiento.toISOString().slice(0,10),
      nombreDuenio:this.form.value.nombreDuenio,
      apellidoDuenio: this.form.value.apellidoDuenio,
      dniDuenio:this.form.value.dniDuenio,
      telefonoDuenio:this.form.value.telefonoDuentelefonoDuenio,
      domicilioDuenio:this.form.value.domicilioDuenio,
      emailDuenio:this.form.value.emailDuenio


    }



    console.log("Formulario válido!")

    if (this.id==undefined){
      this.adminS.addMascota(mascotas).subscribe(


        res =>{
         let result: any = res;
         console.log(result)
           console.log("Mascota agregada!")
           Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Mascota agregada...',
            showConfirmButton: false,
            timer: 2500
          })
           this.dialogRef.close(true);
         })
    }

    else{
      this.adminS.updatePet(this.id, mascotas).subscribe(


        res =>{
         let result: any = res;
         console.log(result)
           console.log("Mascota actualizada...")

        Swal.fire({
          icon: 'success',
          showLoaderOnConfirm: true,
          title: 'Perfil actualizado...',
          showConfirmButton: false,
          timer: 2500
        })
           this.dialogRef.close(true);
         })
    }

  }
  cancelar(){
    this.dialogRef.close(false);
  }
}
