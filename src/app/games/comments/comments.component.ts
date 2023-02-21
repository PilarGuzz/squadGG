import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Game } from '../../shared/interfaces/game.interface';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment/comment.service';
import { Post } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  game!: Game;
  postsList!: Post[]
  constructor(private gameService : GamesService, private route: ActivatedRoute, private commentserice:CommentService) { }

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


    this.commentserice.postsList(1, 10, this.game.gamename)
    .subscribe({
      next:(resp)=> {
        this.postsList = resp;
      }
    })
  }

}
