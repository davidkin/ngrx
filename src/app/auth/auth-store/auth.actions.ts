import { createAction, props, Action } from '@ngrx/store';
import { User } from '../model/user.model';

export enum EAuthActions {
    login = '[Login Page] User Login',
    logout = '[Top Menu] User Logout',
}

export const login = createAction(
    '[Login Page] User Login',
    props<{ payload: User }>()
);

export const logout = createAction(
    '[Top Menu] User Logout',
);
