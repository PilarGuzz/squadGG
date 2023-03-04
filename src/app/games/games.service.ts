import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../shared/interfaces/game.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  URL: string = 'http://localhost:8081/games'


  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.URL)
  }

  getGame(gamename: string): Observable<Game> {

    return this.http.get<Game>(this.URL + `/${gamename}`)
  }

  addGame(game: string, img: File | undefined): Observable<any> {
    const datos: FormData = new FormData();


    if (img) {
      datos.append('img', img, img.name);

    }
    datos.append('gamename', game)

    return this.http.post<any>(this.URL, datos);
  }

  // deleteGame2(gamename : string) : void {
  //   console.log('antes de borrar '+ gamename);
  //   this.http.delete<string>(this.URL+'/'+gamename);
  // }

  deleteGame(gamename: string): Observable<any> {
    return this.http.delete<string>(this.URL + '/' + gamename);
  }

  updateImg(gamename: string,  img: File | undefined): void {
    const formData = new FormData();
    
    if (img) {
      formData.append('img', img, img.name);
      this.http.put<any>(this.URL + '/' + gamename, formData)
      .subscribe(response => {
        console.log('Juego eliminado con éxito:', response);
        // Realizar cualquier acción necesaria después de la eliminación
      }, error => {
        console.error('Error al eliminar el juego:', error);
        // Realizar cualquier acción necesaria en caso de error
      });

    }

  }
}
