import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableUsersComponent } from './users/datatable-users/datatable-users.component';

const routes: Routes = [

  { path:'',
    children: [
      { path: 'users',
      component: DatatableUsersComponent
      }   

  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)

  ]
})
export class AdminRoutingModule { }
