import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserComponent } from './../user/user.component';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
constructor(
        private router: Router,
        private authenticationService: UserComponent
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.loggedinuser;
        console.log("AUTH GUARD: "+currentUser);

        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}