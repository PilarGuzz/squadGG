import { Component, OnInit, ViewChild  } from '@angular/core';
import { Game } from '../shared/interfaces/game.interface';
import { GamesService } from './games.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  

  dataSource!: MatTableDataSource<Game>;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;
  
  games: Game[] = [];
  role: string | null = '';

  displayedColumns: string[] = ['position', 'gamename', 'img'];


  constructor(private gameService : GamesService) {   }


  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.cargarDatos();
    
  }

  public cargarDatos(): void {
    this.gameService.getGames()
    .subscribe(datos => {
      this.games = datos;
      this.dataSource = new MatTableDataSource(datos);
      this.dataSource.sort = this.sort;
    });
  };

 

}


