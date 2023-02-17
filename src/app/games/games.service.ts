import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../shared/interfaces/game.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  URL : string = 'http://localhost:8081/games'


  constructor(private http: HttpClient) { }

  getGames():Observable<Game[]>{
    return this.http.get<Game[]>(this.URL)
  }
}
