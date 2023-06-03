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

  updateReportStatus(reportId: number, newStatus: string) {
    this.reportSrv.changeStatus(reportId, newStatus)
      .subscribe(
        () => {
          console.log('Estado actualizado exitosamente');
          // Aquí puedes realizar acciones adicionales después de actualizar el estado, si es necesario
        },
        error => {
          console.error('Error al actualizar el estado del reporte', error);
          // Maneja el error de acuerdo a tus necesidades
        }
      );
  }



}
