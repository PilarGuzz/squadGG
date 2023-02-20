import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Game } from '../../shared/interfaces/game.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  game!: Game;
  constructor(private gameService : GamesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe({
      next:(param) =>{
        this.gameService.getGame(param['name'])
        .subscribe({
          next: resp => this.game = resp,
          error: (error) => console.log(error)
        })
      },
      error: (error) => console.log(error)
    })
  }

}
