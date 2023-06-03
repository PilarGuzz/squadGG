import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportDTO } from '../_interfaces/reportDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  URL: string = 'http://localhost:8081/reports'
  //URL: string = environment.apiUrl + '/reports'

  constructor(private http: HttpClient) { }

  sendReport(report: FormData){
    return this.http.post(this.URL, report);
  }

  getReports(): Observable<any> {
    return this.http.get(this.URL);

  }

  changeStatus(id: number, newStatus: string): Observable<any> {
    const formData = new FormData();
    formData.append('newStatus', newStatus);

    return this.http.put(this.URL +"/"+ id, formData);

  }



}
