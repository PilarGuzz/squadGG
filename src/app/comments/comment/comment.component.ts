import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/_interfaces/postDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { CommentService } from '../../_services/comment.service';
import { ReportService } from 'src/app/_services/report.service';
import { FriendshipService } from 'src/app/_services/friendship.service';
import { FRequest } from 'src/app/_interfaces/friendshipDto.interface';
import { Userdto } from 'src/app/_interfaces/user.interface';
import { UserService } from 'src/app/_services/user.service';

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

  friends: FRequest[] = [];
  userFriends: Userdto[] = [];
  currentUser!: String | null;


  constructor(private route: ActivatedRoute, private commServ: CommentService,
    private authServ: AuthService, private router: Router, private reportServ: ReportService,
    private friendshipSrv: FriendshipService, private userSrv: UserService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.getAllFriendship();

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

        swalert.fire({
          title: '¿Estás seguro que quieres eliminarlo?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: `No`,
        }).then((result: { isConfirmed: any; isDenied: any; }) => {
          if (result.isConfirmed) {

            this.commServ.deletePost(id, this.gamename)
              .subscribe({
                next: (resp) => {
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

  async reportPost(id: any) {
    /**
     * Comprobamos si esta logueado,
     * si no, se le da la opcion de ir al login o registrarse
     */
    if (!this.authServ.isAuthenticated()) {
      this.needLogin('Necesitas estar logueado para reportar');

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

        this.reportServ.sendReport(formData)
          .subscribe({
            next: (resp) => {

              swalert.fire('Reportado!', '', 'success')

            },
            error: (error) => {
              console.log(error);
            }

          })

      }
    }

  }

  showPost(id: number) {
    if (!this.authServ.isAuthenticated()) {
      this.needLogin('Necesitas estar logueado para ver más información');

    } else {
      this.gamename = this.postsList[0].gamename.gamename;
      this.commServ.post(id)
        .subscribe({
          next: (resp) => {
            this.post = resp;
            swalert.fire({
              icon: 'info',
              title: `${resp.title}`,
              html: ` <div style="text-align: left; margin-left: 20px;">
                  <p><b>Usuario SquadGG: </b> ${resp.username.username} </p> <br> 
                  <p><b>Usuario en ${resp.gamename}:</b> ${resp.nickgame} </p> 
                  <p><b>Region:</b> ${resp.region} </p> 
                  <p class="card-text"> <b>Nivel de usuario en ${resp.gamename}: </b> ${resp.levelingame}</p>
                  <p class="card-text"> <b>Nivel de usuario en competitivo: </b> ${resp.ranklevel}</p>
                  <p><b>Mensaje:</b> ${resp.description} </p>
                  </div>`,

            })
          }

        })
    }
  }
  isFriend(username: string): boolean {
    return this.userFriends.some(user => user.username === username);
  }
  addFriend(friend: string) {
    if (!this.authServ.isAuthenticated()) {
      this.needLogin('Necesitas estar logueado para agregar amigos');

    } else {
      swalert.fire({
        title: '¿Quieres enviar una petición de amistad a ' + friend + ' ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: `No`,
      }).then((result: { isConfirmed: any; isDenied: any; }) => {

        if (result.isConfirmed) {
          this.friendshipSrv.createRequest(friend)
            .subscribe({
              next: (resp) => {
                this.post = resp;
                swalert.fire('Petición enviada', '', 'success')
                this.getAllFriendship();
              },
              error: (error) => {
                swalert.fire('No se ha podido enviar', '', 'info')
              }

            })
        } else if (result.isDenied) {
          swalert.fire('Petición no enviada', '', 'info')
        }

      });




    }
  }

  getAllFriendship() {
    const user = localStorage.getItem('user');
    if (user != null)
      this.friendshipSrv.getFriendshipByUser(user).subscribe({
        next: (resp) => {
          this.friends = resp.data;
          this.userFriends = [];

          for (let fr of this.friends) {
            if (fr.friend == user) {
              this.userSrv.getUserDto(fr.user)
                .subscribe((userData: Userdto) => {
                  this.userFriends.push(userData);
                })

            } else {
              this.userSrv.getUserDto(fr.friend)
                .subscribe((userData: Userdto) => {
                  this.userFriends.push(userData);
                })
            }
          }

        }
      })

  }

  needLogin(message: string) {
    swalert.fire({
      title: message,
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
  }

}
