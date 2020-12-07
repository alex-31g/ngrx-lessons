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

// ===============
// Смотри урок '26. NGRX-4. Metareducers.md'

// В качестве аргумента, metareducer принимает редюсер, который должен быть вызван после metareducer
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {

	// Metareducer должен возвращать функцию, которая принимает два параметра: состояние и действие
	return (state, action) => {
		// console.log('state before:', state);
		// console.log('action:', action);

		// Metareducers не должны изменять передаваемые им состояние и действие!!!

		// Сама же функция должна возвращать вызов переданного редюсера
		return reducer(state, action);
	}
}

// Добавляем logger metareducer в массив metaReducers
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
// ===============
