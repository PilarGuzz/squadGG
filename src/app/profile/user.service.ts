import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserApi } from '../shared/interfaces/user.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL : string = 'http://localhost:8081/users'


  constructor(private http: HttpClient) { }

  getUsers(size:number,pag:number):Observable<UserApi>{

    return this.http.get<UserApi>(this.URL+'?pageNumber='+pag+'&sizeNumber='+size)
  }

  getUser(username:string |null):Observable<User>{
    console.log(username);
    
    return this.http.get<User>(this.URL+'/'+username)
  }

  updateUser(username: string, form: FormGroup): Observable<any> {
    const formData = new FormData();
    if (form.value.img) {
      formData.append('img', form.value.img, form.value.img.name);
    }
    if (form.value.password) {
      formData.append('password', form.value.password);
    }

    if (form.value.email) {
      formData.append('email', form.value.email);
    }

    if (form.value.birth) {
      formData.append('birth', form.value.birth);
    }

    return this.http.put(this.URL + '/' + username, formData)
  }

}
