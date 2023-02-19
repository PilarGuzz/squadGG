import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Token } from '../shared/interfaces/token.interface';
import { User } from '../shared/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  urllogin:string = 'http://localhost:8081/login'
  urlreg:string = 'http://localhost:8081/registrer'
  


  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<Token>(this.urllogin, { 'username': username, 'password': password }, this.httpOptions)
      .pipe(switchMap(resp => {
        console.log('login');
        localStorage.setItem("jwt", resp.token);
        localStorage.setItem("loggedIn", "true");

        return of(true);
        //this.isAuthenticated();

      }), catchError(error => {
        localStorage.removeItem("jwt");
        localStorage.setItem("loggedIn", "false");
        return of(false)

      })
      )

  }

  logout() {
    //loggedIn = false;
    localStorage.setItem("loggedIn", "false")
    localStorage.removeItem('jwt');

  }

  isAuthenticated() : boolean {
    const token = localStorage.getItem('jwt');
    if(token != null){

      return true
    }
    return false

  }


  registerUser(user: User): Observable<any> {
    return this.http.post(this.urlreg, user).pipe(
      switchMap((response: any) => {
        return response;
      })
    );
  }

}
