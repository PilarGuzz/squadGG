import { Component, OnInit } from '@angular/core';
import { ReportDTO } from 'src/app/_interfaces/reportDTO';
import { ReportStatus } from 'src/app/_interfaces/reportStatus.interface';
import { ReportService } from 'src/app/_services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  allReports!: ReportDTO[]
  reportStatuses: string[] = Object.values(ReportStatus);
  selectedStatus?: ReportStatus;

  constructor(private reportSrv: ReportService) { }

  ngOnInit(): void {
    this.loadData();
  };
  
  loadData(){
    this.reportSrv.getReports()
    .subscribe({
      next: resp => {
        this.allReports = resp;
      },
      error: (error) => console.log(error)
    });
    
    
  }



}
