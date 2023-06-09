import { Component, OnInit } from '@angular/core';
import { FRequest } from '../_interfaces/friendshipDto.interface';
import { UserChat, Userdto } from '../_interfaces/user.interface';
import { FriendshipService } from '../_services/friendship.service';
import { UserService } from '../_services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
const swalert = require('sweetalert2')

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  username!: string | null;
  fRequests: FRequest[] = [];
  userReqList: Userdto[] = [];
  friends: FRequest[] = [];
  userFriends: Userdto[] = [];
  userDto!: Userdto;
  friendsChat: UserChat[] = [];

  activeFriend: Userdto | null = null; // Amigo activo seleccionado
  activeFriend$?: Observable<Userdto | null>;


  selectFriend(friend: Userdto): void {
  (this.activeFriend$ as BehaviorSubject<Userdto | null>).next(friend);
    this.activeFriend = friend;
  }

  constructor(private friendServ: FriendshipService, private userSrv: UserService) {
    this.activeFriend$ = new BehaviorSubject<Userdto | null>(null);
   }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.getRequests();
    this.getFriends();
  }

  //Recupero todos los amigos desde Java
  getFriends() {
    if (this.username != null) {
      this.friendServ.getFriendsByUser(this.username)
        .subscribe({
          next: (resp) => {
            this.friends = resp.data;
            this.userFriends = [];
            
            for(let fr of this.friends){
              if(fr.friend == this.username){
                this.userSrv.getUserDto(fr.user)
                .subscribe((userData: Userdto) => {
                  this.userFriends.push(userData);
                })

              }else{
                this.userSrv.getUserDto(fr.friend)
                .subscribe((userData: Userdto) => {
                  this.userFriends.push(userData);
                })
              }
            }
            
          }
        })
    }


  }

  //Obtenfo todas las peticiones de amistad de un usuario
  getRequests() {
    if (this.username != null) {
      this.friendServ.getFriendsRquestsByUser(this.username)
        .subscribe({
          next: (resp) => {
            this.fRequests = resp.data;
            this.userReqList = []
            for (let req of this.fRequests) {
              this.userSrv.getUserDto(req.user)
                .subscribe((userData: Userdto) => {
                  this.userReqList.push(userData);
                })

            }

          }
        })
    }
  }

  //Obtengo el DTO de un usuario
  getUserDto(username: string) {
    this.userSrv.getUserDto(username)
      .subscribe((userData: Userdto) => {
        this.userDto = userData;
      }

      )

  }

  //PARA ACEPTAR O ELIMINAR LA PETICION DE AMISTAD
  answer(friend: string): void {
    swalert.fire({
      title: '¿Quieres aceptar la petición de ' + friend + ' ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      if (result.isConfirmed) {
        this.friendServ.acceptRequest(friend).subscribe(
          (data) => {
            this.getRequests();
            this.getFriends();
            swalert.fire('Aceptado!', '', 'success')
          }
        );

      } else if (result.isDenied) {
        this.friendServ.deleteFrienship(friend).subscribe(
          (data) => {
            this.getRequests();
            swalert.fire('Eliminado', '', 'info')
          }
        );
      }
    });
  }

}
