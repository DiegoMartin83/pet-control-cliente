import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {UsersService} from '../../services/users.service';
import { AbstractControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';




import{ Turnos } from 'src/app/models/turnosModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TurnostasksComponent } from '../turnostasks/turnostasks.component';
import { Usuario } from 'src/app/models/userModel';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id','dni','nombre','apellido','telefono','celular','domicilio','email','rol','perfil','acciones'];
  dataSource: MatTableDataSource<Usuario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  usuario:any=[];
  loading:boolean=false;

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

  constructor(private userS: UsersService,private adminS: AdminService ,private router: Router,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
   }


   listarUsuarios(){
    this.adminS.getUsers().subscribe(
      res => {
        this.loading=false;
        this.usuario = res;
        this.dataSource.data = this.usuario;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
      },
      err => console.log(err)

    )


  }
  ngOnInit(): void {
    this.loading= true;
    setTimeout(() =>{
      this.adminS.getUsers().subscribe(
        res => {
          this.loading=false;
          this.usuario = res;
          this.dataSource.data = this.usuario;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res)
        },
        err => console.log(err)

      )

    },800);


  }

  editarTurno(id:any){
    // this.userS.updateTurno(turn, id).subscribe(

    // )
    console.log(id)
  }

  deleteUser(id: number) {
    // this.loading = true;

    Swal.fire({
      title: 'Está a punto de eliminar el usuario seleccionada. Desea continuar?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.loading=false;
          this.adminS.deleteUser(id).subscribe(() => {
            this.listarUsuarios();

          })

        Swal.fire('Se ha eliminado el usuario de la lista!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se ha modificado la lista de usuarios', '', 'info')
      }
    })


  }

  // agregarYeditarTurnos(id?:number){

  //   const dialogRef = this.dialog.open(TurnostasksComponent, {
  //     width: '550px',
  //     disableClose: true,
  //     data:{ id: id}

  //   });
  //   dialogRef.afterClosed().subscribe(result=>{
  //     if(result){
  //       // this.listarTurnos();
  //       this.ngOnInit();
  //     }
  //   })

  // }

}






// const listarTurnos: Turnos[] =[

// {idVisita:1, fechaVisita: new Date() ,horaVisita: new Date(),nombre_mascota:'Boby',id_mascota:1, idProfesional:2, estado: 'Activo'},

// ]























  // listarTurnos(){
  //   this.userS.listTurns().subscribe(
  //     res => {
  //       this.loading=false;
  //       this.turno = res;
  //       this.dataSource.data = this.turno;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       console.log(res)
  //     },
  //     err => console.log(err)

  //   )


  // }

















