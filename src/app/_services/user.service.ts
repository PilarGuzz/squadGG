import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User, UserApi } from '../_interfaces/user.interface';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //URL : string = 'http://localhost:8081/users'
  //urlAdmin : string = 'http://localhost:8081/admin/users'
  URL : string = environment.apiUrl + '/users'
  urlAdmin : string = environment.apiUrl + '/admin/users'


  constructor(private http: HttpClient) { }

  getUsers(size:number,pag:number):Observable<UserApi>{

    return this.http.get<UserApi>(this.URL+'?pageNumber='+pag+'&sizeNumber='+size)
  }

  getUser(username:string |null):Observable<User>{
    
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
// @ts-ignore
    return this.http.put(this.URL + '/' + username, formData, {responseType: 'text'})
  }

  updateAdmin(username: string, role: string): Observable<any>{

    const formData = new FormData();
    formData.append('role', role);

    return this.http.put(this.urlAdmin + '/' + username, formData)

  }

  updateActive(username: string, active: boolean): Observable<any>{
    
    const activeString = active.toString();
    const formData = new FormData();
    formData.append('active', activeString);

    return this.http.put(this.urlAdmin + '/' + username, formData)
    

  }

}
