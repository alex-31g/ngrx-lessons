import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
	MetaReducer,
	createReducer,
	on
} from '@ngrx/store';
import { IUsers } from '../model/users.model';
import { AuthActions } from './../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
	user: IUsers
}

export const initialAuthState: AuthState = {
	user: undefined
};

export const authReducer = createReducer(
	initialAuthState,
	on(  
		AuthActions.loginAction,
		(state, action) => {
			console.log('state ==>', state);
			console.log('action ==>', action);
			return {
				user: action.user
			}
		}
	)
);