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

  constructor(private gameService : GamesService) { }

  ngOnInit(): void {
    this.gameService.getGames()
    .subscribe({
      next: resp => this.games = resp,
      error: (error) => console.log(error)
    })
  }

}
