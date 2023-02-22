import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL : string = 'http://localhost:8001/users'


  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    const jwt = localStorage.getItem('jwt');

    return this.http.get<User[]>(this.URL)
  }

  getUser(id:string |null):Observable<User>{
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    
    // const httpOptions = {
    //    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + jwt  })};
    // console.log(httpOptions);
    
    return this.http.get<User>(this.URL+`/${id}`)
  }


}
