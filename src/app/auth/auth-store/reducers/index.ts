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
import { AppState } from '../../../reducers';
import { EAuthActions } from '../auth.actions';

export interface AuthState {
  user: User;
}

export const initAuthState: AuthState = {
  user: undefined
};

export const authReducer = (
  state = initAuthState,
  action: AuthActions
): AuthState => {

  switch (action.type) {
    case EAuthActions.login: {
      return {
        ...state,
        user: action.payload
      };
    }

    case EAuthActions.logout: {
      return {
        ...state,
        user: undefined
      };
    }

    default:
      return state;
  }

};

// export const authReducer = createReducer(
//   initAuthState,

//   on(
//     AuthActions.login,
//     (state, action) => {
//       return {
//         ...state,
//         user: action.payload
//       };
//     }
//   ),
//   on(
//     AuthActions.logout,
//     (state, action) => {
//       return {
//         ...state,
//         user: undefined
//       };
//     }
//   ),

// );
