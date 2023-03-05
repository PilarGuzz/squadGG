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

  displayedColumns: string[] = ['img', 'username', 'email', 'birth', 'role', 'enabled', 'acciones' ];
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


  async updateUser(username : string) {
       
    
    const { value: formValues } = await swalert.fire({
      title: 'Multiple inputs',
      html:
    '  <p>Estado del usuario:</p>'+
  '<input type="radio" id="deactivate" name="status" value="false">'+
 ' <label for="html">Desactivado</label><br>'+
  '<input type="radio" id="activate" name="status" value="true">'+
 ' <label for="css">Activado</label><br>'+
  '<p>Rol:</p>'+
  '<input type="radio" id="user" name="rol" value="USER_ROLE">'+
  '<label for="age1">User</label><br>'+
  '<input type="radio" id="admin" name="rol" value="ADMIN_ROLE">'+
  '<label for="age1">Admin</label><br>',
  showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.querySelector('input[name="status"]:checked')).value,
          (<HTMLInputElement>document.querySelector('input[name="rol"]:checked')).value
        ]
      }
    })
    
    if (formValues) {
      swalert.fire(JSON.stringify(formValues))
    }
    
    
  }

}
