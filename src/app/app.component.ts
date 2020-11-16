import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from './reducers/index'
import { map } from 'rxjs/operators';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

	// Переменные, в зависимости от которых будут отображаться кнопки LOG-IN и LOG-OUT
	isLoggedIn$: Observable<boolean>;
	isLoggedOut$: Observable<boolean>;

	constructor(
		// Чтобы получить доступ к данным из хранилища - инжектим Store
		private store: Store<AppState>
	) {}

	ngOnInit() {
		// Просмотреть данные store
		this.store.subscribe(state => console.log('store value:', state));

		this.isLoggedIn$ = this.store
			.pipe(
				// Переводим значение в boolean:
				// если в user есть данные - получим true, если нет - false
				// map(state => !!state["auth"].user) // <-- del
				select(isLoggedIn) // <-- add
			);
		
		this.isLoggedOut$ = this.store
			.pipe(
				// Переводим значение в boolean:
				// если в user есть данные - получим false, если нет - true
				// map(state => !state["auth"].user) // <-- del
				select(isLoggedOut) // <-- add
			);
	}
}
