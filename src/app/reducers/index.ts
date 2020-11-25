import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface AppState {

}

// Ключи внутри reducers - это свойства state в store
export const reducers: ActionReducerMap<AppState> = {

	// Свойство router соответствует значению ключа stateKey в файле src\app\app.module.ts:
	// <StoreRouterConnectingModule.forRoot({stateKey: 'router', routerState: RouterState.Minimal})> 

	router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
