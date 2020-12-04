import { loadAllPosts } from './posts.actions';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../reducers';
import { tap, first, finalize } from "rxjs/operators";
import { Store } from "@ngrx/store";

@Injectable()
// Resolver сервисы необходимо наследовать от Resolve класса
export class PostsResolver implements Resolve<any> { 

	loading = false;

	constructor(
		// Чтобы получить доступ к данным из хранилища - инжектим Store
		private store: Store<AppState>
	) {}

	// Resolver сервис имеет один обязательный метод resolve(), который принимает несколько аргументов:
	// - route: ActivatedRouteSnapshot - содержит иформацию об текущем url
	// - state: RouterStateSnapshot - содержит текущий стейт роутера
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.store.pipe(
			tap(() => {
				if (!this.loading) {
					this.loading = true;
					// Вызов действия loadAllPosts()
					this.store.dispatch(loadAllPosts());
				}
			}),

			// Чтобы завершить роутинг, Observable метода resolve() должен быть завершен
			first(),
			finalize(() => this.loading = false)
		)
	}
}