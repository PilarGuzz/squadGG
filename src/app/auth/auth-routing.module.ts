import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrerComponent } from './registrer/registrer.component';


const routes: Routes = [

  { path:'',
    children: [
      { path: 'registrer',
      component: RegistrerComponent

      }
  ]}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
