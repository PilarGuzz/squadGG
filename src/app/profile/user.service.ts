import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL : string = 'http://localhost:8081/users'


  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    const jwt = localStorage.getItem('jwt');

    return this.http.get<User[]>(this.URL)
  }

  getUser(username:string |null):Observable<User>{
  /*   const jwt = localStorage.getItem('jwt');
    console.log(jwt); */
    
    // const httpOptions = {
    //    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + jwt  })};
    // console.log(httpOptions);
    console.log(username);
    
    return this.http.get<User>(this.URL+'/'+username)
  }


}
