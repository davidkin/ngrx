import { createAction, props, Action } from '@ngrx/store';
import { User } from '../model/user.model';

export enum EAuthActions {
    login = '[Login Page] User Login',
    logout = '[Top Menu] User Logout',
}

export class Login implements Action {
    public readonly type = EAuthActions.login;
    constructor(public payload: User) {}
}

export class Logout implements Action {
    public readonly type = EAuthActions.logout;
}

// export const login = createAction(
//     '[Login Page] User Login',
//     props<{ payload: User }>()
// );

// export const logout = createAction(
//     '[Top Menu] User Logout',
// );
