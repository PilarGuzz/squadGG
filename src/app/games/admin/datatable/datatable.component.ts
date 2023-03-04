import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { GamesService } from '../../games.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  dataSource!: MatTableDataSource<Game>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['position', 'gamename', 'img', 'acciones'];


  constructor(private gameService : GamesService) {   }

  ngOnInit(): void {
    this.cargarDatos();
  }

  public cargarDatos(): void {
    this.gameService.getGames()
    .subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos);
      this.dataSource.sort = this.sort;
    });
  };

  public eliminar(gamename:string): void{
    
    swalert.fire({
      title: '¿Estás seguro que quieres eliminarlo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.gameService.deleteGame(gamename)
        swalert.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        swalert.fire('No ha sido eliminado', '', 'info')
      }
  });
}
  

  

}
