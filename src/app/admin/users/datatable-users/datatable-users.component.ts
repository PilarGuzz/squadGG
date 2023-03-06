import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/profile/user.service';
import { UserApiContent } from 'src/app/shared/interfaces/user.interface';

const swalert = require('sweetalert2')


@Component({
  selector: 'app-datatable-users',
  templateUrl: './datatable-users.component.html',
  styleUrls: ['./datatable-users.component.css']
})
export class DatatableUsersComponent implements OnInit {

  dataSource!: MatTableDataSource<UserApiContent>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  displayedColumns: string[] = ['img', 'username', 'email', 'birth', 'role', 'enabled' ];
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
    this.userService.getUsers(this.size, this.page)
    .subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos.content);
      this.totalElements = datos.totalElements;
    this.pageSize = datos.size;
    this.paginator.pageIndex = datos.number;
      this.dataSource.sort = this.sort;
    });
  };


  async updateAdmin(username : string, role: string) {
    const roleToChange = (role === "ADMIN_ROLE") ? "USER_ROLE" : "ADMIN_ROLE";
    swalert.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.userService.updateAdmin(username, roleToChange)
        .subscribe({
          next: (resp) => {
            console.log('cambiado');
            
            swalert.fire(
              'Actualizado!',
              'Your file has been deleted.',
              'success'
            )
        }, error: (error) => {
          swalert.fire('Error', error.error.msg, 'error')
        }
      })
      }
    }) 
  }



  async updateActive(username : string, active: boolean) {
    swalert.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.userService.updateActive(username, !active)
        swalert.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    }) 
  }


}
