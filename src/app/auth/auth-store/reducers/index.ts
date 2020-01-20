import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { User } from '../../model/user.model';
import { AuthActions } from '../auth-types.action';

export interface AuthState {
  user: User;
}

export const initAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initAuthState,

  on(
    AuthActions.login,
    (state, action) => {
      return {
        ...state,
        user: action.payload
      };
    }
  ),
  on(
    AuthActions.logout,
    (state, action) => {
      return {
        ...state,
        user: undefined
      };
    }
  ),

);
