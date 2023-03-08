import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { GamesService } from 'src/app/_services/games.service';
import { Game } from 'src/app/_interfaces/game.interface';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable-game.component.html',
  styleUrls: ['./datatable-game.component.css']
})
export class DatatableGameComponent implements OnInit {
  dataSource!: MatTableDataSource<Game>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['position', 'gamename', 'img', 'acciones'];


  constructor(private gameService : GamesService, private router: Router) {   }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.gameService.getGames()
    .subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos);
      this.dataSource.sort = this.sort;
    });
  };

  eliminar(gamename:string): void{
    swalert.fire({
      title: '¿Estás seguro que quieres eliminarlo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.gameService.deleteGame(gamename).subscribe(
          (data) => {
            this.cargarDatos();
            swalert.fire('Eliminado!', '', 'success')
          }
        );
        
      } else if (result.isDenied) {
        swalert.fire('No ha sido eliminado', '', 'info')
      }
  });
}


async updateFile(game : string) {
  const { value: file } = await swalert.fire({
    title: 'Selecciona una imagen',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Sube una imagen'
    }
  });
  
  if (file) {
    
    this.gameService.updateImg(game, file).subscribe(response => {
      swalert.fire('Imagen Actualizada!', '', 'success')
      this.cargarDatos();
    }, error => {
      console.error('Error al actualizar la imagen:', error);
      swalert.fire('No se ha podido actualizar!', '', 'info')
     
      
    });

  
  }
}
  

  

}
