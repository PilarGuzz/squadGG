import { Component, OnInit } from '@angular/core';
import { GamesService } from '../_services/games.service';
import { Game } from '../_interfaces/game.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../_services/comment.service';
import { formatDate } from '@angular/common';
import { Content } from '../_interfaces/postDTO';
import { AuthService } from '../_services/auth.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  game!: Game;
  postsList!: Content[]
  ready: boolean = false;
  size: number = 5;
  page: number = 1;
  gamename: string = '';
  maxPage!: number;
  isAdmin: boolean = false;

  //FILTROS
  nivel: string | undefined;
  nivelCompetitivo: string | undefined;
  region: string | undefined;
  texto: string | undefined;
  username: string | undefined;

  constructor(private gameService: GamesService, private route: ActivatedRoute, 
    private commentservice: CommentService, public authServ: AuthService, 
    private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('role') == "ADMIN_ROLE"){
      this.isAdmin = true;
    }

    this.route.parent?.params.subscribe(
      (params) => {
        this.gamename = params['name'];

        this.gameService.getGame(this.gamename)
          .subscribe({
            next: resp => {
              this.game = resp
              this.cargarDatos()
            },

            error: (error) => console.log(error)
          })
      });


  }


  cargarDatos() {
    //Almacenamos los filtros
   
    const filters = {
      nivel: this.nivel,
      nivelCompetitivo: this.nivelCompetitivo,
      region: this.region,
      username: this.username,
      texto: this.texto
    };

    this.commentservice.getPosts(this.game.gamename, this.page, this.size, filters.nivel,
      filters.nivelCompetitivo,
      filters.region,
      filters.username,
      filters.texto )
      .subscribe({
        next: (resp) => {
          this.postsList = resp.content;
          this.maxPage = resp.totalPages;
          this.postsList = this.postsList.map((post) => {
            const date = new Date(
              post.datepublication[0],
              post.datepublication[1],
              post.datepublication[2],
              post.datepublication[3],
              post.datepublication[4]
            );

            return {
              ...post,
              dateformated: formatDate(date, 'dd/MM/yyyy h:mm', 'en-EN'),
            };
          });
          this.ready = true;
        }
      })
  }

  handleFiltersChanged(filters: any) {
    
    this.nivel = filters.nivel;
    this.nivelCompetitivo = filters.nivelCompetitivo;
    this.region = filters.region;
    this.username = filters.username;
    this.texto = filters.texto;
  
    this.cargarDatos();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.cargarDatos();
    }
  }

  nextPage() {
    if (this.page < this.maxPage) {
      this.page++;
      this.cargarDatos();
    }
  }

  goToPage(pages: number) {
    if (pages >= 1 && pages <= this.maxPage) {
      this.page = pages;
      this.cargarDatos();
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.maxPage }, (_, i) => i + 1);
  }

  reloadData(msj: string) {
    this.cargarDatos()

  }

  onButtonClick() {

    if (!localStorage.getItem('jwt')) {
      swalert.fire({
        title: 'Necesitas estar logueado para crear un post',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Login',
        denyButtonText: `Registro`,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.router.navigate(['auth/login']);
        } else if (result.isDenied) {
          this.router.navigate(['auth/registrer']);
        }
      })
    } else {
      this.router.navigate(['/game/' + this.gamename + '/posts/add'])
    }
  }



}
