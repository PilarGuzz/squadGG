import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL : string = 'http://localhost:8002/users'


  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    const jwt = localStorage.getItem('jwt');
  //  const httpOptions = {
  //     headers: new HttpHeaders({ 'Authorization': 'Bearer ' + jwt  })};
    return this.http.get<User[]>(this.URL)
  }

  getUser(id:string):Observable<User>{
    const jwt = localStorage.getItem('jwt');
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Authorization': 'Bearer ' + jwt  })};
    return this.http.get<User>(this.URL+`/${id}`)
  }

}
