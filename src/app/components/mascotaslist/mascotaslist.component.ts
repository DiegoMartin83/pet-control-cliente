import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { AbstractControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ Mascotas } from 'src/app/models/mascotas';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TurnostasksComponent } from '../turnostasks/turnostasks.component';
import {MascotasComponent} from '../mascotas/mascotas.component';
import { Location } from '@angular/common';
import { MascotastasksComponent } from '../mascotastasks/mascotastasks.component';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-mascotaslist',
  templateUrl: './mascotaslist.component.html',
  styleUrls: ['./mascotaslist.component.css']
})
export class MascotaslistComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['idAnimal','nombre','especie','raza','sexo','color','fechaDeNacimiento','edad','nombreDuenio', 'apellidoDuenio','dniDuenio','telefonoDuenio','domicilioDuenio','emailDuenio','acciones'];
  dataSource: MatTableDataSource<Mascotas>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  mascota:any=[];
  loading:boolean=false;
  rol = localStorage.getItem('rol');


  // agregarYeditarTurnos(id?:number){

  //   const dialogRef = this.dialog.open(TurnostasksComponent, {
  //     width: '550px',
  //     disableClose: true,
  //     data:{ id: id}

  //   });
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel= "Items por página"
    this.dataSource.sort = this.sort;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  constructor(private userS: UsersService,private adminS: AdminService , public dialog: MatDialog, private location: Location) {
    this.dataSource = new MatTableDataSource();
   }

   ngOnInit(): void {
    this.loading= true;
    setTimeout(() =>{
      this.userS.getPets().subscribe(
        res => {
          this.loading=false;
          this.mascota = res;
          this.dataSource.data = this.mascota;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res)
        },
        err => console.log(err)

      )

    },800);


  }

  goBack() {
    this.location.back();
  }

  listarMascotas(){
    this.userS.getPets().subscribe(
      res => {
        this.loading=false;
        this.mascota = res;
        this.dataSource.data = this.mascota;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
      },
      err => console.log(err)

    )


  }

  editarTurno(id:any){
    // this.userS.updateTurno(turn, id).subscribe(

    // )
    console.log(id)
  }


  agregarYeditarMascotas(id?:number){

    const dialogRef = this.dialog.open(MascotastasksComponent, {
      width: '550px',
      disableClose: true,
      data:{ id: id}

    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.listarMascotas();
      }
    })

  }

  deletePet(id: number) {
    // this.loading = true;

    Swal.fire({
      title: 'Está a punto de eliminar la mascota seleccionada. Desea continuar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.loading=false;
          this.adminS.deleteAfiliado(id).subscribe(() => {
            this.listarMascotas();

          })

        Swal.fire('Se ha eliminado a la mascota de la lista!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha modificado la lista', '', 'info')
      }
    })


  }



}














// const listarTurnos: Turnos[] =[

// {idVisita:1, fechaVisita: new Date() ,horaVisita: new Date(),nombre_mascota:'Boby',id_mascota:1, idProfesional:2, estado: 'Activo'},

// ]
















































