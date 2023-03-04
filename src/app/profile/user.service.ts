import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { FormGroup } from '@angular/forms';

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
    console.log(username);
    
    return this.http.get<User>(this.URL+'/'+username)
  }

  // updateUser(username: string, form: FormGroup): Observable<any> {
  //   const formData = new FormData();
    
  // }

  updateUser(json:any, img : File| undefined, username: string ): Observable<any> {
    const formData = new FormData();
    console.log(json);
    
    formData.append('user', new Blob([JSON.stringify(json)], {type: 'application/json'}))
    console.log(formData);
    if (img) {
      formData.append('img', img, img.name);
    }
    
    return this.http.put<any>(this.URL + '/' + username, formData)
    
  }


}
