import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, Effect } from '@ngrx/effects';
import { AuthActions } from './auth-types.action';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EAuthActions, Login, Logout } from './auth.actions';

@Injectable()
export class AuthEffect {

    constructor(
        private actions$: Actions,
        private router: Router
    ) {}

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType<Login>(EAuthActions.login),
        tap(action => {
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType<Logout>(EAuthActions.logout),
        tap(() => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
        })
    );
}
