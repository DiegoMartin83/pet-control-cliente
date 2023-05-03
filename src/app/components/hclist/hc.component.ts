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
import { HistoriaClinica } from '../../models/historiaClinica';
import { HctasksComponent } from '../hctasks/hctasks.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hc',
  templateUrl: './hc.component.html',
  styleUrls: ['./hc.component.css']
})
export class HclistComponent implements OnInit {

  displayedColumns: string[] = ['idHistoriaClinica','nombre','especie', 'raza','descripcion','resumen','acciones'];
  dataSource: MatTableDataSource<HistoriaClinica>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  hc:any=[];
  loading:boolean=false;
  rol= localStorage.getItem('rol');
  location: any;

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



  constructor(private userS: UsersService, private router: Router,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
   }



  ngOnInit(): void {
    this.loading= true;
    setTimeout(() =>{
      this.userS.listFiles().subscribe(
        res => {
          this.loading=false;
          this.hc = res;
          this.dataSource.data = this.hc;
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
  editarTurno(id:any){
    // this.userS.updateTurno(turn, id).subscribe(

    // )
    console.log(id)
  }


  agregarYeditarHistorias(id?:number){

    const dialogRef = this.dialog.open(HctasksComponent, {
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








// const listarTurnos: Turnos[] =[

// {idVisita:1, fechaVisita: new Date() ,horaVisita: new Date(),nombre_mascota:'Boby',id_mascota:1, idProfesional:2, estado: 'Activo'},

// ]































