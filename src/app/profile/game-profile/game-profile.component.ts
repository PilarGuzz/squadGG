import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from 'src/app/_interfaces/game.interface';
import { Play } from 'src/app/_interfaces/play-interface';
import { User } from 'src/app/_interfaces/user.interface';
import { GamesService } from 'src/app/_services/games.service';
import { PlayService } from 'src/app/_services/play.service';

@Component({
  selector: 'app-game-profile',
  templateUrl: './game-profile.component.html',
  styles: [
  ]
})
export class GameProfileComponent implements OnInit {
/*AMPLIACION PROYECTO*/
//@ViewChild('myForm') myForm!: NgForm;
  juego : string = "";
  games: Game[] = [];
  plays: Play[] = [];
  gamesLoaded: boolean = false;
  playsLoaded: boolean = false;


  @Input() user!: User;


  constructor(private gameService : GamesService, private playService : PlayService) { }

  ngOnInit(): void {
    this.gameService.getGames()
    .subscribe(datos => {
      this.games = datos;
      
      this.gamesLoaded = true

      
    });
    this.playService.getPlaysByUser()
    .subscribe(datosP => {
      this.plays = datosP;
      
      this.playsLoaded = true
      
    });
  }


  delete(fav: string): void{
    
    if(fav){
      
      this.playService.deleteGame(fav)
      .subscribe(
        data => {
          const index = this.plays.findIndex(game => game.gamename === fav);

          if (index !== -1) {
            this.plays.splice(index, 1);
          }
        }
      );
    }

  }

  add(): void{
    
    if(this.juego){
      
      this.playService.addPlay(this.juego).subscribe(
        data => {
          
          this.plays.push(data);
          this.ngOnInit();
        }
      );
    }
  }

}
