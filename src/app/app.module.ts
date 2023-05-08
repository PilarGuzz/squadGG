import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { GamesModule } from './games/games.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './_services/auth-interceptor.service';
import { RolGuard } from './_guards/rol.guard';
import { TokenGuard } from './_guards/token.guard';
import { ProfileModule } from './profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SpinnerInterceptor } from './shared/spinner/spinner.interceptor';

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
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('807418543433-0hjiibg74ddg11liscb6tlnu774g41v7.apps.googleusercontent.com') // your client id
        }
      ]
    }
  },
   {
    provide:HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
   },


   RolGuard, TokenGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
