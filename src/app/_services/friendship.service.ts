import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  //URL: string = 'http://localhost:8081/friends'
  URL: string = environment.apiUrl + '/friends'

  constructor(private http: HttpClient) { }

  getFriendsByUser(user:string): Observable<any> {
    return this.http.get(this.URL+"/"+ user);

  }

  getFriendshipByUser(user:string): Observable<any> {
    return this.http.get(this.URL+"/"+ user + "/all");

  }

  getFriendsRquestsByUser(user:string): Observable<any> {
    return this.http.get(this.URL+"/"+ user + "/requests");

  }

  getOneFriendship(user:string, friend: string): Observable<any> {
    return this.http.get(this.URL+"/"+ user + "/" + friend);

  }

  createRequest(friend:string):Observable<any> {
    return this.http.post(this.URL+"/"+ friend, {});

  }

  acceptRequest(friend:string):Observable<any> {
    return this.http.put(this.URL+"/"+ friend, {});

  }

  deleteFrienship(friend:string):Observable<any> {
    return this.http.delete(this.URL+"/"+ friend);

  }
}
