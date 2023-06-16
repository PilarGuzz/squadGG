import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Play } from '../_interfaces/play-interface';
import { Observable } from 'rxjs';
import { Gamename } from '../_interfaces/play-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  URL: string = environment.apiUrl + '/play'

  constructor(private http: HttpClient) { }

  getPlays(): Observable<Play[]> {
    return this.http.get<Play[]>(this.URL)
  }

  getPlaysByUser(): Observable<Play[]> {
    return this.http.get<Play[]>(this.URL+"/user")
  }

  addPlay(game: string): Observable<any> {
    const datos: FormData = new FormData();
    datos.append('gamename', game)

    return this.http.post<any>(this.URL, datos);
  }

  deleteGame(gamename: string): Observable<any> {
    return this.http.delete<any>(this.URL+"/"+gamename);
  }

 
}
