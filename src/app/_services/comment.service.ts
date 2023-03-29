import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_interfaces/post.interface';
import { Content, PostDto } from '../_interfaces/postDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //URL : string = environment.apiUrl + '/posts'
  URL : string = 'http://localhost:8081/posts'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  postsList(page: number,size:number, game: string): Observable<any>{
      return this.http.get<PostDto>(`${this.URL}/${game}?pageNumber=${page}&sizeNumber=${size}`)
  }

  addPost(post: Content, game: string): Observable<any> {    
    return this.http.post<Content>(`${this.URL}/${game}`, post, this.httpOptions);
  }

  deletePost(id:number, game:string): Observable<string> {    
    // @ts-ignore
    return this.http.delete<any>(`${this.URL}/${game}/${id}`, {responseType: 'text'})
   
  }

  post(id: number, game: string): Observable<any>{
    
    return this.http.get<Content>(`${this.URL}/${game}/${id}`)
  }

}
