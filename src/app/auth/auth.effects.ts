import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

// Классы эффектов не инжектятся в другие места приложения, как это можно делать с классами сервисов.

@Injectable()
export class AuthEffects {

	// Инжектим сервис Actions, который является частью библиотеки ngrx/effects
	constructor(private action$: Actions){

		// Для реализации эффекта необходимо получить уведомление о том, что возникло действие.
		// Поскольку сервис Actions, который мы заинжектили, это observable - то подписываемся на него.
		// Значения, выпускаемые потоком Actions - являются действиями (actions), которые происходят в приложении
		
		action$.subscribe(
			// То, что мы хотим сделать при получении login-action		
			action => {
				if (action.type == '[Login Page] User Login') {
					localStorage.setItem('user', JSON.stringify(action['user']));
				}
			}
		);
	}

}