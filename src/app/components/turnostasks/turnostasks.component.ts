import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turnos } from 'src/app/models/turnosModel';
import { UsersService } from 'src/app/services/users.service';
import { DateAdapter } from '@angular/material/core';
import { InjectFlags } from '@angular/compiler/src/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnostasks',
  templateUrl: './turnostasks.component.html',
  styleUrls: ['./turnostasks.component.css']
})
export class TurnostasksComponent implements OnInit {
form:FormGroup;
minDate:Date;
loading:boolean=false;
modo:string = 'Agendar ';
id:number | undefined;

  pets:number[] = [];

  constructor(public dialogRef: MatDialogRef<TurnostasksComponent>,
    private fb: FormBuilder, private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any ,private userS: UsersService) {
      // this.minDate = moment(new Date()).format('YYYY-MM-DD')
      this.minDate = new Date()

      this.form=this.fb.group({
        fechaVisita:['',Validators.required],
        horaVisita:['', Validators.required],
        nombre_mascota:['',Validators.required],
        id_mascota:['',[Validators.required,Validators.minLength(1),
        Validators.maxLength(3)]],
        idProfesional:['',[Validators.required,Validators.minLength(1),
        Validators.maxLength(3)]],
        estado:['',[Validators.required,Validators.minLength(1),
        Validators.maxLength(1)]],
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
  this.traerTurnos(id);
  }
}

traerTurnos(id: number){
this.userS.getTurnByID(id).subscribe(data=>{
  console.log(data);
  this.form.patchValue({
    fechaVisita: data.fechaVisita,
    horaVisita: data.horaVisita,
    nombre_mascota: data.nombre_mascota,
    id_mascota: data.id_mascota,
    idProfesional: data.idProfesional,
    estado: data.estado
  })
})
}
  addTurnosTasks(){

    if(this.form.invalid){
      console.log("Formulario inválido!")
      return;
    }
    console.log(this.form)

    const turnos : Turnos = {
      fechaVisita: this.form.value.fechaVisita.toISOString().slice(0,10),
      horaVisita: this.form.value.horaVisita,
      nombre_mascota:this.form.value.nombre_mascota,
      id_mascota:this.form.value.id_mascota,
      idProfesional:this.form.value.idProfesional,
      estado:this.form.value.estado

    }


    console.log("Formulario válido!")


    if(this.id==undefined){
      this.userS.addTurn(turnos).subscribe(

        res =>{
         let result: any = res;
         console.log(result)
           console.log("Turno agregado!")
           Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Turno agregado...',
            showConfirmButton: false,
            timer: 2500
          })
           this.dialogRef.close(true);
         })
    }

    else{
      this.userS.updateTurn(this.id, turnos).subscribe(

        res =>{
         let result: any = res;
         console.log(result)
           console.log("Turno modificado!")

           Swal.fire({
            icon: 'success',
            showLoaderOnConfirm: true,
            title: 'Turno actualizado...',
            showConfirmButton: false,
            timer: 2500
          })

         })

         this.dialogRef.close(true);
    }

  }
  cancelar(){
    this.dialogRef.close(false);
  }
}
