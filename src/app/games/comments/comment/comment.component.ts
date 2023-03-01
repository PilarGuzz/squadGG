import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/shared/interfaces/game.interface';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postsList!: Post[];


  //postArray: Post[] = Object.values(this.postsList);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {


  }

  fecha(fechaStr: string) {
    const fechaArr = fechaStr.split(',');
    const fecha = new Date(Date.UTC(+fechaArr[0], +fechaArr[1] - 1, +fechaArr[2], +fechaArr[3], +fechaArr[4]));
    return fecha;


  }

}
