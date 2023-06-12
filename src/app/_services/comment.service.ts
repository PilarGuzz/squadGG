import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_interfaces/post.interface';
import { Content, PostDto } from '../_interfaces/postDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //URL : string = environment.apiUrl + '/posts'
  URL: string = 'http://localhost:8081/posts'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getPosts(gamename: string,  pageNumber: number, sizeNumber: number, nivel?: string, 
          nivelCompetitivo?: string, region?: string, username?: string, texto?: string): Observable<any> {

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('sizeNumber', sizeNumber.toString());

    if (nivel) {
      params = params.set('nivel', nivel.toString());
    }

    if (nivelCompetitivo) {
      params = params.set('nivelCompetitivo', nivelCompetitivo);
    }

    if (region) {
      params = params.set('region', region);
    }

    if (username) {
      params = params.set('username', username);
    }

    if (texto) {
      params = params.set('texto', texto);
    }

    const baseurl = `${this.URL}/${gamename}`;
    return this.http.get<PostDto>(baseurl, { params });
  }


  // postsList(page: number, size: number, game: string): Observable<any> {
  //   return this.http.get<PostDto>(`${this.URL}/${game}?pageNumber=${page}&sizeNumber=${size}`)
  // }

  addPost(post: Content, game: string): Observable<any> {
    return this.http.post<Content>(`${this.URL}/${game}`, post, this.httpOptions);
  }

  deletePost(id: number, game: string): Observable<any> {
    // @ts-ignore
    return this.http.delete<any>(`${this.URL}/${game}/${id}`)

  }

  post(id: number): Observable<any> {

    return this.http.get<Content>(`${this.URL}/one/${id}`)
  }

}
