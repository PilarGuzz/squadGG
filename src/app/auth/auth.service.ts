import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { Token } from '../shared/interfaces/token.interface';
import { User } from '../shared/interfaces/user.interface';
import { DecodeToken } from '../shared/interfaces/decode-token.interface';
import jwtDecode from 'jwt-decode';
import { UserService } from '../profile/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean> (false);
  private role = new BehaviorSubject<string> ('');
  //private user = new BehaviorSubject<User>({username: '', email: '', password:'', birth: new Date()})
  user!: User;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  urllogin:string = 'http://localhost:8081/login'
  urlreg:string = 'http://localhost:8081/registrer'
  token!: DecodeToken;


  constructor(private http: HttpClient, private userSrv: UserService) { }

  get isloggedIn(){
    return this.loggedIn.asObservable();
  }

  get userRole(){
    return this.role.asObservable();
  }

  // get userSession(){
  //   return this.user.asObservable();

  // }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<Token>(this.urllogin, { 'username': username, 'password': password }, this.httpOptions)
      .pipe(switchMap(resp => {
        this.loggedIn.next(true);
        localStorage.setItem("jwt", resp.token);
        localStorage.setItem("loggedIn", "true");
        this.token = jwtDecode(resp.token);
        localStorage.setItem('role', this.token.role);
        this.role.next(this.token.role);
        localStorage.setItem('user', this.token.sub);
        localStorage.setItem('email', this.token.email);
        

        return of(true);
        //this.isAuthenticated();

      }), catchError(error => {
        this.loggedIn.next(false);
        this.role.next('');
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        localStorage.setItem("loggedIn", "false");
        return of(false)

      })
      )

  }

  userSession(){
    this.userSrv.getUser(this.token.sub)
        .subscribe({
          next:us => this.user = us,
          error: (error) => console.log(error)
        })

  }

  logout() {
    //loggedIn = false;
    localStorage.setItem("loggedIn", "false")
    this.loggedIn.next(false);
    this.role.next('');
    localStorage.removeItem('jwt');
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("email");

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
