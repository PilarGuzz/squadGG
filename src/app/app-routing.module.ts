import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolGuard } from './guards/rol.guard';
import { TokenGuard } from './guards/token.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [

  { path: '',
    component:HomeComponent,
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
    canActivate: [TokenGuard, RolGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    
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
