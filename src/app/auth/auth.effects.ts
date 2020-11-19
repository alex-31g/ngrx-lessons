import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';

// Классы эффектов не инжектятся в другие места приложения, как это можно делать с классами сервисов.

@Injectable()
export class AuthEffects {

		// BEST способ ================================

		// Создавая эффекты с помощью createEffect() мы получаем: 
		// - автоматический перезапуск в случаи возникновении ошибок;
		// - автоматический subscribe(), поэтому не нужно выполнять subscribe() в ручную, как в способе 1 и 2 

		login$ = createEffect( 
			() => this.action$.pipe(

				// ofType - используется для фильтрации действий по их типу
				ofType(AuthActions.loginAction),

				tap(action => {
					localStorage.setItem('user', JSON.stringify(action.user));
				})
			),

			// Указываем, что данный эффект не возвращает action
			{ dispatch: false }
		);
	// =============================================

	// Инжектим сервис Actions, который является частью библиотеки ngrx/effects
	constructor(private action$: Actions){

		// Для реализации эффекта необходимо получить уведомление о том, что возникло действие.
		// Поскольку сервис Actions, который мы заинжектили, это observable - то подписываемся на него.
		// Значения, выпускаемые потоком Actions - являются действиями (actions), которые происходят в приложении

		// 1 способ ===================================
		// action$.subscribe(
		// 	// То, что мы хотим сделать при получении login-action		
		// 	action => {
		// 		if (action.type == '[Login Page] User Login') {
		// 			localStorage.setItem('user', JSON.stringify(action['user']));
		// 		}
		// 	}
		// );
		// ============================================

		// 2 способ ===================================
		// const login$ = this.action$
		// 	.pipe(
		//    // ofType - используется для фильтрации действий по их типу
		// 		ofType(AuthActions.loginAction),
		// 		tap(action => {
		// 			localStorage.setItem('user', JSON.stringify(action['user']));
		// 		})
		// 	);
		// login$.subscribe();
		// ============================================

		// СПОСОБЫ 1 И 2 НЕ ГАРАНТИРУЮТ, ЧТО ДАННЫЕ ПОПАДУТ В localStorage, ЕСЛИ СЛУЧИТСЯ ОШИБКА !!!
		// ПОЭТОМУ ИСПОЛЬЗОВАТЬ ТОЛЬКО СПОСОБ - BEST
	}

}