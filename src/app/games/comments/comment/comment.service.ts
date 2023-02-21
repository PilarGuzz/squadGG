import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  URL : string = 'http://localhost:8081/posts'


  constructor(private http: HttpClient) { }

  postsList(page: number,size:number, game: string): Observable<Post[]>{
      return this.http.get<Post[]>(`${this.URL}/${game}?pageNumber=${page}&pageSize=${size}`)
  }

}
