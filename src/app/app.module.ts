import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { RegisterModule } from './register/register.module';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    HttpClientModule,
    JwtModule.forRoot({
          config: {
            tokenGetter: function  tokenGetter() {
                 return     localStorage.getItem('access_token');},
            whitelistedDomains: ['localhost:4200'],
            blacklistedRoutes: ['http://localhost:3000/auth/login']
          }
        })
  ],
  providers: [UserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
