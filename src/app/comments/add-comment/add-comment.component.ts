import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from '../../_services/comment.service';

const swalert = require('sweetalert2')


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  gamename: string = ''
  username: string | null = localStorage.getItem('user')

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private commServ: CommentService, 
    private router: Router, private authSrv: AuthService) { }

  myForm!: FormGroup;

  ngOnInit(): void {
    this.route?.parent?.params.subscribe(
      (params) => {
        this.gamename = params['name'];

        this.myForm = this.fb.group({
          title: ['', [Validators.required]],
          description: ['', [Validators.required]],
          region: ['', [Validators.required]],
          nickgame: ['', [Validators.required]],
          levelingame: ['', [Validators.required]],
          ranklevel: ['', [Validators.required]],
        })
      })
  }

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }



  send() {
    this.commServ.addPost(this.myForm.value, this.gamename)
      .subscribe({
        next: (response) => {
          swalert.fire({
            icon: 'success',
            title: 'Post creado!',
            text: 'El post fue creado exitosamente!',
          });
          this.router.navigate(['/game/'+this.gamename+'/posts'])
        },
        error: (err) => {
          console.log(err);

          if (err.status === 409) {
            // mostrar un mensaje de error al usuario, indicando que el username ya existe
            swalert.fire({
              icon: 'error',
              title: 'Oops...El nombre de usuario ya existe!',
              text: 'Inserte un username válido',
            })
          } else {
            // mostrar un mensaje de error al usuario
            swalert.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al registrar el usuario',
            })
          }
        }
      })


  }
}