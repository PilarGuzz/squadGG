import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { Token } from '../_interfaces/token.interface';
import { User } from '../_interfaces/user.interface';
import { DecodeToken } from '../_interfaces/decode-token.interface';
import jwtDecode from 'jwt-decode';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean> (false);
  public admin = new BehaviorSubject<boolean> (false);
  private role = new BehaviorSubject<string> ('');
  private usernameNav = new BehaviorSubject<string> ('');

  //private user = new BehaviorSubject<User>({username: '', email: '', password:'', birth: new Date()})
  user!: User;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
   urllogin: string = environment.apiUrl + '/login'
   urlreg: string = environment.apiUrl + '/registrer'
  // urllogin:string = 'http://localhost:8081/login'
  // urlreg:string = 'http://localhost:8081/registrer'
  token!: DecodeToken;

  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get isAdmin() {
    return this.admin.asObservable();
  }

  get username() {
    return this.usernameNav.asObservable();
  }

  constructor(private http: HttpClient, private userSrv: UserService, private router: Router) { }


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
        this.usernameNav.next(this.token.sub);
        localStorage.setItem('email', this.token.email);
        if(this.token.role == 'ADMIN_ROLE'){
          this.admin.next(true);
        }

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
    localStorage.setItem("loggedIn", "false");
    this.loggedIn.next(false);
    this.admin.next(false);
    this.role.next('');
    localStorage.removeItem('jwt');
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    this.router.navigate(['/auth/login'])
  }

  isAuthenticated() : boolean {
    const token = localStorage.getItem('jwt');
    if(token != null){

      return true
    }
    return false

  }


  registerUser(user: User): Observable<any> {
    return this.http.post(this.urlreg, user)
  }

}
