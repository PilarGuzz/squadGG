import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Play } from '../_interfaces/play-interface';
import { Observable } from 'rxjs';
import { Gamename } from '../_interfaces/play-interface';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  URL: string = 'http://localhost:8081/play'
  //URL: string = environment.apiUrl + '/games'

  constructor(private http: HttpClient) { }

  getPlays(): Observable<Play[]> {
    return this.http.get<Play[]>(this.URL)
  }

  addPlay(game: Gamename): Observable<any> {

    return this.http.post<any>(this.URL, game);
  }

  deleteGame(gamename: Gamename): Observable<any> {
    return this.http.delete<any>(this.URL);
  }

 
}
