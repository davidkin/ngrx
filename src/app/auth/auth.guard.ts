import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from './auth-store/auth.selectors';
import { tap } from 'rxjs/operators';
import { AuthActions } from './auth-store/auth-types.action';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const userProfile = localStorage.getItem('user');

        if (userProfile) {
            this.store.dispatch(AuthActions.login({ payload: JSON.parse(userProfile) }));
        }

        return this.store.pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');
                    }
                })
            );
    }
}
