import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from './_guards/rol.guard';
import { TokenGuard } from './_guards/token.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [

  { path: '',
    component:HomeComponent,
    pathMatch: 'full'
  },
  { path: 'contact',
    component:ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule),
    canActivate: []
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [TokenGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    
  },

  { path: '**',
  component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
