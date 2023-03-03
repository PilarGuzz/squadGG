import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { GamesModule } from './games/games.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddGameComponent } from './games/admin/add-game/add-game.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RolGuard } from './guards/rol.guard';
import { TokenGuard } from './guards/token.guard';
import { ProfileModule } from './profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    GamesModule,
    ProfileModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, RolGuard, TokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
