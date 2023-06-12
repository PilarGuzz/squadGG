import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //URL: string = 'http://localhost:8081/contact'
  URL: string = environment.apiUrl + '/contact'

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, message: string) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    return this.http.post(this.URL, formData);
  }
}
