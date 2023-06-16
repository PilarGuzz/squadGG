import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/_interfaces/postDTO';
import { ReportDTO } from 'src/app/_interfaces/reportDTO';
import { ReportStatus } from 'src/app/_interfaces/reportStatus.interface';
import { CommentService } from 'src/app/_services/comment.service';
import { ReportService } from 'src/app/_services/report.service';
const swalert = require('sweetalert2')


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  allReports!: ReportDTO[]
  reportStatuses: string[] = Object.values(ReportStatus);
  selectedStatus?: ReportStatus;
  post!: Content;

  constructor(private reportSrv: ReportService, private postSrv: CommentService) { }

  ngOnInit(): void {
    this.loadData();
  };

  loadData() {
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

        },
        error => {
          console.error('Error al actualizar el estado del reporte', error);

        }
      );
  }
  showPost(id: number) {
    this.postSrv.post(id)
      .subscribe({
        next: (resp) => {
          this.post = resp;
          
          swalert.fire({
            icon: 'info',
            title: `${resp.title}`,
            html: ` <div style="text-align: left; margin-left: 20px;">
                  <p><b>Usuario SquadGG: </b> ${resp.username} </p> <br> 
                  <p><b>Usuario en ${resp.gamename}:</b> ${resp.nickgame} </p> 
                  <p><b>Region:</b> ${resp.region} </p> 
                  <p class="card-text"> <b>Nivel de usuario en ${resp.gamename}: </b> ${resp.levelingame}</p>
                  <p class="card-text"> <b>Nivel de usuario en competitivo: </b> ${resp.ranklevel}</p>
                  <p><b>Mensaje:</b> ${resp.description} </p>
                  </div>`,

          })
        }

      })
  }



}
