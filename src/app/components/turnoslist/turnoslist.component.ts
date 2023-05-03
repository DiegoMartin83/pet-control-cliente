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





// const listarTurnos: Turnos[] =[

// {idVisita:1, fechaVisita: new Date() ,horaVisita: new Date(),nombre_mascota:'Boby',id_mascota:1, idProfesional:2, estado: 'Activo'},

// ]






@Component({
  selector: 'app-turnoslist',
  templateUrl: './turnoslist.component.html',
  styleUrls: ['./turnoslist.component.css']
})
export class TurnoslistComponent implements OnInit,AfterViewInit {

  displayedColumns: string[] = ['idVisita','fechaVisita','horaVisita','nombre_mascota','id_mascota','idProfesional','estado','acciones'];
  dataSource: MatTableDataSource<Turnos>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  turno:any=[];
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





  turnoCambio = { idTurno: "", nroMascota: "" };

  constructor(private userS: UsersService, private router: Router,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
   }



  ngOnInit(): void {
    this.loading= true;
    setTimeout(() =>{
      this.userS.listTurns().subscribe(
        res => {
          this.loading=false;
          this.turno = res;
          this.dataSource.data = this.turno;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res)
        },
        err => console.log(err)

      )

    },800);


  }

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

  editarTurno(id:any){
    // this.userS.updateTurno(turn, id).subscribe(

    // )
    console.log(id)
  }


  agregarYeditarTurnos(id?:number){

    const dialogRef = this.dialog.open(TurnostasksComponent, {
      width: '550px',
      disableClose: true,
      data:{ id: id}

    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        // this.listarTurnos();
        this.ngOnInit();
      }
    })

  }








}






