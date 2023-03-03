import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/interfaces/game.interface';
import { GamesService } from './games.service';



@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  

  
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

    });
  };

 

}


