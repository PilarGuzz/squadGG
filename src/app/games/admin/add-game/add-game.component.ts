import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../../shared/interfaces/game.interface';
import { GamesService } from '../../games.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  game!: Game;
  gamename!: string;
  img!: string;

  constructor(private gameService: GamesService, private router: Router) { }

  ngOnInit(): void {
  }

  save(): void{
    this.game = {gamename: this.gamename, img: this.img}
    this.gameService.addGame(this.game)
    .subscribe({
      next:(resp) => {
        console.log("respuesta")
        if (resp) this.router.navigate(['/game']);
        else {
          this.gamename="";
          this.img="";
          swalert.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El juego ya existe!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      }
    })
  }

  notValidGamename(): boolean{
    return this.myForm?.controls['gamename']?.invalid && 
        this.myForm?.controls['gamename']?.touched
  }
  notValidImg(): boolean{
    return this.myForm?.controls['img']?.invalid && 
        this.myForm?.controls['img']?.touched
  }

}
