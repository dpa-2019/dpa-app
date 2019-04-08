import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent }      from './register/register.component';
import { UserComponent }      from './user/user.component';
import { ProfileComponent }      from './profile/profile.component';
import { AuthGuard }      from './services/authguard.service';

const routes: Routes = [
{ path: '', component: UserComponent }
,{ path: 'login', component: UserComponent }
, { path: 'register', component: RegisterComponent }
, { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }