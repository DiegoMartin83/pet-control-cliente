import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turnos } from 'src/app/models/turnosModel';
import { UsersService } from 'src/app/services/users.service';
import { DateAdapter } from '@angular/material/core';
import {HistoriaClinica} from 'src/app/models/historiaClinica';
import { InjectFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-hctasks',
  templateUrl: './hctasks.component.html',
  styleUrls: ['./hctasks.component.css']
})
export class HctasksComponent implements OnInit {
  form:FormGroup;
  minDate:Date;
  loading:boolean=false;
  modo:string = 'Agregar ';
  id:number | undefined;


  constructor(public dialogRef: MatDialogRef<HctasksComponent>,
    private fb: FormBuilder, private dateAdapter: DateAdapter<any>, @Inject(MAT_DIALOG_DATA) public data: any ,private userS: UsersService) {
      // this.minDate = moment(new Date()).format('YYYY-MM-DD')
      this.minDate = new Date()

      this.form=this.fb.group({
        descripcion:['',Validators.required],
        id_Animal:['', Validators.required],
        resumen:['',Validators.required],
        nombreMascota:['',[Validators.required]],
      })
      this.id=data.id;
       dateAdapter.setLocale('es');

  console.log("Modal", data);
    }


  ngOnInit(): void {
    this.itsEdit(this.id);
  }

  itsEdit(id:number| undefined){
  if (id !== undefined){
  this.modo = 'Editar ';
  this.traerHc(id);
  }
  }

  traerHc(id: number){
  this.userS.getFileByID(id).subscribe(data=>{
  console.log(data);
  this.form.patchValue({
    nombre: data.nombre,
    especie: data.especie,
    raza: data.raza,
    descripcion: data.descripcion,
    // id_Animal: data.id_Animal,
    resumen: data.resumen,
    // nombreMascota: data.nombreMascota,
  })
  })
  }
  addFilesTasks(){

    if(this.form.invalid){
      console.log("Formulario inválido!")
      return;
    }
    console.log(this.form)

    const hc : HistoriaClinica = {

      nombre: this.form.value.nombre,
      especie: this.form.value.especie,
      raza: this.form.value.raza,
      descripcion: this.form.value.descripcion,
      // id_Animal: this.form.value.id_Animal,
      resumen:this.form.value.resumen,
      // nombreMascota:this.form.value.nombreMascota

    }


    console.log("Formulario válido!")


    if(this.id==undefined){
      this.userS.addFile(hc).subscribe(

        res =>{
         let result: any = res;
         console.log(result)
           console.log("Historia clinica agregada!")
           this.dialogRef.close(true);
         })
    }

    else{
      this.userS.updateFile(this.id,hc).subscribe(

        res =>{
         let result: any = res;
         console.log(result)
           console.log("Historia clinica actualizada!")
           this.dialogRef.close(true);
         })
    }

  }
  cancelar(){
    this.dialogRef.close(false);
  }
  }











