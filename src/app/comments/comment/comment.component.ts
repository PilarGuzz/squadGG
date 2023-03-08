import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/_interfaces/post.interface';
import { CommentService } from '../../_services/comment.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postsList!: Post[];

  gamename: string = '';
  id: number = 0;


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
        console.log(id);
        
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
                  swalert.fire('Eliminado!', '', 'success')

                },
                error: (error) => {

                }

              })
          } else if (result.isDenied) {
            swalert.fire('No ha sido eliminado', '', 'info')
          }

        });
      })
  }


}
