import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserApi, UserToAdminApi, Userdto } from '../_interfaces/user.interface';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  URL : string = environment.apiUrl + '/users'
  urlAdmin : string = environment.apiUrl + '/admin/users'


  constructor(private http: HttpClient) { }

  getUsers(size:number,pag:number):Observable<UserApi>{

    return this.http.get<UserApi>(this.URL+'?pageNumber='+pag+'&sizeNumber='+size)
  }

  getUsersAdmin(size:number,pag:number):Observable<UserToAdminApi>{

    return this.http.get<UserToAdminApi>(this.urlAdmin+'?pageNumber='+pag+'&sizeNumber='+size)
  }

  getUser(username:string |null):Observable<User>{
    
    return this.http.get<User>(this.URL+'/'+username)
  }

  getUserDto(username:string |null):Observable<any>{
    
    return this.http.get<any>(this.URL+'/'+username+"/dto")
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

  updatePass(username : string, currentpassword : string, password : string): Observable<any>{
    const formData = new FormData();
    formData.append('currentpassword', currentpassword);
    formData.append('password', password);


    return this.http.post(this.URL + '/' + username + '/editpass', formData)

  }

  checkPass(username: string, currentpassword : string ): Observable<any>{
    const formData = new FormData();
    formData.append('currentpassword', currentpassword);

    return this.http.post(this.URL + '/' + username + '/checkpass', formData)

  }

}
