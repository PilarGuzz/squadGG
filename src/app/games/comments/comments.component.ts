import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Game } from '../../shared/interfaces/game.interface';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment/comment.service';
import { Post } from '../../shared/interfaces/post.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  game!: Game;
  postsList!: Post[]
  ready: boolean = false;

  constructor(private gameService: GamesService, private route: ActivatedRoute, private commentserice: CommentService) { }

  ngOnInit(): void {
    const gamename = this.route.snapshot.url[0].path

    this.gameService.getGame(gamename)
      .subscribe({
        next: resp => {
          this.game = resp
          this.commentserice.postsList(1, 5, this.game.gamename)
            .subscribe({
              next: (resp) => {
                this.postsList = resp.content;
                this.postsList = this.postsList.map((post) => {
                  console.log(post.datepublication);
                  const date = new Date(
                    post.datepublication[0], 
                    post.datepublication[1], 
                    post.datepublication[2], 
                    post.datepublication[3], 
                    post.datepublication[4]
                  );
                  
                  //const date = new Date(year, monthIndex, day, hours, minutes)
                  return {
                    ...post,
                    dateformated: formatDate(date, 'dd/MM/yyyy h:mm', 'en-EN'),
                  };
                });
                console.log(this.postsList);
                this.ready = true;
              }
            })
        },

        error: (error) => console.log(error)
      })


      

  }


}
