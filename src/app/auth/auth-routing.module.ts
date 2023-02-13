import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';


const routes: Routes = [

  { path:'',
    children: [
      { path: 'registrer',
      component: RegistrerComponent
      },
      { path: 'login',
      component: LoginComponent
      }
  ]}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
