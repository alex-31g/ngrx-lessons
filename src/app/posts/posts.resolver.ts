import { arePostsLoaded } from './posts.selectors';
import { loadAllPosts } from './posts.actions';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../reducers';
import { tap, first, finalize, filter } from "rxjs/operators";
import { select, Store } from "@ngrx/store";

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
			// С помощью оператора select обращаемся к селектору arePostsLoaded, который возвратит 
			// значение флага allPostsLoadedFlag (true/false) в зависимости от того - были ли уже загружены посты или нет.
			// Значение true/false будет получено в параметре postsLoaded следующего оператора tap
			select(arePostsLoaded),

			tap(postsLoaded => {
				// Если посты не загружены - запускаем loadAllPosts action, 
				// который информирует о том, что нужно начать загрузку постов с сервера
				if (!this.loading && !postsLoaded) {
					this.loading = true;
					// Вызов действия loadAllPosts()
					this.store.dispatch(loadAllPosts());
				}
			}),

			// filter - возвращает значения, соответствующие указанному условию
			filter(postsLoaded => postsLoaded),
			
			// Чтобы завершить роутинг, Observable метода resolve() должен быть завершен -
			// вызываем метод first(), который возвратит первое полученное из потока значение,
			// и завершит Observable
			first(),

			// finalize - вызов функции, когда Observable завершается или возникает ошибка
			finalize(() => this.loading = false)
		)
	}
}