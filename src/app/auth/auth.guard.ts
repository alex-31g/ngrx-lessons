import { isLoggedIn } from './auth.selectors';
import { AppState } from './../reducers/index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Injectable()

// guard сервисы необходимо наследовать от CanActivate класса
export class AuthGuard implements CanActivate {

	constructor(
		private store: Store<AppState>,
		private router: Router
	) {}

	// CanActivate класс имеет один обязательный метод canActivate(), который принимает несколько аргументов:
	// - route: ActivatedRouteSnapshot - содержит иформацию об url
	// - state: RouterStateSnapshot - содержит текущий стейт роутера
	// Тип, который возвращает canActivate() - Observable<boolean> - ожидаем true/false

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		
		console.log('route ==>', route);
		console.log('state ==>', state);

		// Обращаемся к store, чтобы узнать авторизирован пользователь или нет
		return this.store.pipe(

			// Получаем профайл пользователя из store, используя isLoggedIn селектор
			select(isLoggedIn),
			
			// Далее результат работы метода select считываем в методе tap()
			tap(loggedIn => {
				if (!loggedIn) {
					// Если профайла пользователя нет - перенаправляем роут на страницу авторизации
					this.router.navigateByUrl('/login');
				}
			})

		)
	}

}