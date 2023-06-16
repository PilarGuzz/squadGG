import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../../_interfaces/game.interface';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GamesService } from 'src/app/_services/games.service';
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
  img?: File;

  constructor(private gameService: GamesService, private router: Router) { }

  ngOnInit(): void {
  }

  save(): void{
    this.gameService.addGame(this.gamename, this.img)
    .subscribe({
      next:(resp) => { 
        this.gamename="";
        this.img= undefined;
        swalert.fire({
          icon: 'success',
          title: 'Juego creado!',
          text: 'El juego fue creado exitosamente!',
        });
        this.router.navigate(['/game/admin/edit']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.gamename="";
          this.img= undefined;
          swalert.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El juego ya existe!',
          });
        } else {
          this.gamename="";
          this.img= undefined;
          swalert.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error!',
          });
        }
        this.router.navigate(['/game/admin/add']);
      }
    })
  }

  onFileSelected(event: any) {
    this.img = event.target.files[0];
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
