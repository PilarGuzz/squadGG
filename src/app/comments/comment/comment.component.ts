import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/_interfaces/post.interface';
import { Content } from 'src/app/_interfaces/postDTO';
import { CommentService } from '../../_services/comment.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postsList!: Content[];

  @Output() reload = new EventEmitter<string>()

  gamename: string = '';
  id: number = 0;
  post!: Content;


  constructor(private route: ActivatedRoute, private commServ: CommentService) { }

  ngOnInit(): void {


  }

  fecha(fechaStr: string) {
    const fechaArr = fechaStr.split(',');
    const fecha = new Date(Date.UTC(+fechaArr[0], +fechaArr[1] - 1, +fechaArr[2], +fechaArr[3], +fechaArr[4]));
    return fecha;

  }

  deletePost(id: number) {
    this.route?.parent?.params.subscribe(
      (params) => {
        this.gamename = params['name'];
        
        //this.id = params['id'];
        swalert.fire({
          title: '¿Estás seguro que quieres eliminarlo?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: `No`,
        }).then((result: { isConfirmed: any; isDenied: any; }) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            this.commServ.deletePost(id, this.gamename)
              .subscribe({
                next: (resp) => {
                  console.log(resp);
                  
                  swalert.fire('Eliminado!', '', 'success')
                  this.reload.emit('Este dato viajará hacia el padre');
                },
                error: (error) => {
                  console.log(error);
                }

              })
          } else if (result.isDenied) {
            swalert.fire('No ha sido eliminado', '', 'info')
          }

        });
      })
  }

  showPost(id: number){
    this.gamename = this.postsList[0].gamename.gamename    ;
    this.commServ.post(id, this.gamename)
    .subscribe({
      next: (resp) => {
        this.post = resp;
        swalert.fire({
          icon: 'info',
          title: `${resp.title}`,
          html: ` <div style="text-align: left; margin-left: 20px;">
                  <p><b>Usuario: </b> ${resp.username.username} </p> <br> 
                  <p><b>Usuario en el juego:</b> ${resp.nickgame} </p> <br> 
                  <p><b>Usuario en el juego:</b> ${resp.region} </p> <br> 
                  <p><b>Mensaje:</b> ${resp.description} </p>
                  </div>`,
     
        })
      }

    })
  }


}
