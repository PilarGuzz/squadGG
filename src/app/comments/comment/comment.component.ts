import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/_interfaces/postDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from '../../_services/comment.service';
import { ReportService } from 'src/app/_services/report.service';
import { ReportDTO } from 'src/app/_interfaces/reportDTO';

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


  constructor(private route: ActivatedRoute, private commServ: CommentService, 
    private authServ: AuthService, private router: Router, private reportServ: ReportService) { }

  ngOnInit(): void {


  }

  fecha(fechaStr: string) {
    const fechaArr = fechaStr.split(',');
    const fecha = new Date(Date.UTC(+fechaArr[0], +fechaArr[1] - 1, +fechaArr[2], +fechaArr[3], +fechaArr[4]));
    return fecha;

  }

  isOwnerOrAdmin(owner: string): boolean {

    if (this.authServ.isAuthenticated() && (owner == localStorage.getItem('user') || localStorage.getItem('role') == 'ADMIN_ROLE')) {
      return true;
    }
    return false;
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

  async reportPost(id: any){
    /**
     * Comprobamos si esta logueado,
     * si no, se le da la opcion de ir al login o registrarse
     */
    if (!this.authServ.isAuthenticated()) {
      swalert.fire({
        title: 'Necesitas estar logueado para reportar',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Login',
        denyButtonText: `Registro`,
      }).then((result: any) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigate(['auth/login']);
        } else if (result.isDenied) {
          this.router.navigate(['auth/registrer']);
        }
      })

      /**
       * Se muestra el formulario de reporte si esta logueado
       */
    } else {
      const selectOptions = [
        { value: 'Spam', display: 'Spam y publicidad' },
        { value: 'Fake_information', display: 'Información falsa' },
        { value: 'Bullyng', display: 'Bullyng' },
        { value: 'Racism', display: 'Racismo' },
        { value: 'Offensive_language', display: 'Lenguaje inapropiado' },
        { value: 'Sexual_content', display: 'Contenido sexual' },
        { value: 'Other', display: 'Otro' }
      ];

      const swalResult = await swalert.fire({
        title: 'Reportar',
        html:
        '<select id="swal-select" class="swal2-select">' +
        selectOptions.map(option => `<option value="${option.value}">${option.display}</option>`).join('') +
        '</select>' +
        '<textarea id="swal-textarea" class="swal2-textarea"></textarea>',
        focusConfirm: false,
        preConfirm: () => {
          return [
            (<HTMLInputElement>document.getElementById('swal-select')).value,
            (<HTMLTextAreaElement>document.getElementById('swal-textarea')).value
          ];
        }
      });
      if (swalResult.isConfirmed) {

        
        const [selectedOption, message] = swalResult.value;
        const formData = new FormData();
        formData.append('user', localStorage.getItem('user') ?? '');
        formData.append('post', id);
        formData.append('reason', selectedOption);
        formData.append('message', message);

        // const report : ReportDTO = {
        //   user: localStorage.getItem('user'),
        //   post:  id,
        //   reason:  selectedOption,
        //   message: message
        // };
       // console.log(report);
        this.reportServ.sendReport(formData)
        .subscribe({
          next: (resp) => {
            console.log(resp);

            swalert.fire('Reportado!', '', 'success')

           // this.reload.emit('Este dato viajará hacia el padre');
          },
          error: (error) => {
            console.log(error);
          }

        })
        
        // Hacer algo con la opción seleccionada y el mensaje
      }
    }

  }

  showPost(id: number) {
    if (!this.authServ.isAuthenticated()) {
      this.router.navigate(['auth/login']);
    } else {
      this.gamename = this.postsList[0].gamename.gamename;
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


}
