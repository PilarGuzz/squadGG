import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UserApiContent, UserToAdminContent } from 'src/app/_interfaces/user.interface';

const swalert = require('sweetalert2')


@Component({
  selector: 'app-datatable-users',
  templateUrl: './datatable-users.component.html',
  styleUrls: ['./datatable-users.component.css']
})
export class DatatableUsersComponent implements OnInit {

  dataSource!: MatTableDataSource<UserToAdminContent>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['img', 'username', 'email', 'birth', 'role', 'active' ];
  page:number = 1;
  size:number = 10;
  totalElements: any;
  pageSize: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  onPageChange(event: PageEvent) {
    this.page=event.pageIndex+1;
    this.size=event.pageSize;
    this.cargarDatos();

  }
  

  cargarDatos(): void {
    this.userService.getUsersAdmin(this.size, this.page)
    .subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos.content);
      this.totalElements = datos.totalElements;
    this.pageSize = datos.size;
    this.paginator.pageIndex = datos.number;
      this.dataSource.sort = this.sort;
      console.log(datos.content);
      
    });
  };


  async updateAdmin(username : string, role: string) {
    const roleToChange = (role === "ADMIN_ROLE") ? "USER_ROLE" : "ADMIN_ROLE";
    swalert.fire({
      title: '¿Estás seguro?',
      text: "Vas a cambiar el rol del usuario " + username,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.userService.updateAdmin(username, roleToChange)
        .subscribe({
          next:(resp) =>{
        swalert.fire(
          'Actualizado!',
          'El rol ha sido actualizado.',
          'success'
        )
        this.cargarDatos();
        this.router.navigate(['/admin/users'])
      }
      })
    }}) 
  }



  async updateActive(username : string, active: boolean) {

    
    swalert.fire({
      title: '¿Estás seguro?',
      text: "Va a cambiar el estado del usuario "+ username,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.userService.updateActive(username, !active)
        .subscribe({
          next:(resp) =>{
        swalert.fire(
          'Actualizado!',
          'El estado ha sido actualizado.',
          'success'
        )
        this.cargarDatos();
        this.router.navigate(['/admin/users'])
          }
      })
      }
    }) 
  }


}
