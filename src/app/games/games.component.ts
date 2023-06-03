import { Component, OnInit } from '@angular/core';
import { Game } from '../_interfaces/game.interface';
import { GamesService } from '../_services/games.service';



@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  

  
  games: Game[] = [];
  role: string | null = '';
  isAdmin: boolean = false;

  displayedColumns: string[] = ['position', 'gamename', 'img'];


  constructor(private gameService : GamesService) {   }


  ngOnInit(): void {
    //window.location.reload()

    this.role = localStorage.getItem('role');
    if(this.role == "ADMIN_ROLE"){
      this.isAdmin = true;
    }
    this.cargarDatos();
    
  }
  

  public cargarDatos(): void {
    this.gameService.getGames()
    .subscribe(datos => {
      this.games = datos;

    });
  };
  
  

 

}


