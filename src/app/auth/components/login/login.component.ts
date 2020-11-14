import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { noop } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from '../../../reducers/index';
import { AuthActions } from '../../action-types';

@Component({
  selector: "nl-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})

export class LoginComponent {
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private router: Router,	

		// Инжектим store и указываем ему тип AppState - это тип для state (состояния) нашего store
		// AppState-интерфейс находится в src\app\reducers\index.ts
		private store: Store<AppState>,	
	) {
		this.form = fb.group({
			email: ['Lucio_Hettinger@annie.ca', [Validators.required, Validators.email]],
			id: ['5', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
		});
	}

	login() {
		const val = this.form.value;
		console.log('form data', val);

		this.auth.getData(val.email, val.id)
			.pipe(
				// tap() используется для выполнения какого-либо действия; не изменяет исходного значения
				tap(userData => {
					if (!userData) throw new Error;
					console.log('user data', userData);

					// Создаем action
					const newLoginAction = AuthActions.loginAction({user: userData});
					console.log('newLoginAction ==>', newLoginAction);
					// Отправляем action
					this.store.dispatch(newLoginAction);

					// ===> Отправка action без использования loginAction():
					// this.store.dispatch({
					// 	type: '[Login Page] User Login',
					// 	payload: {
					// 		user: userData 
					// 	}
					// })

					this.router.navigateByUrl('/posts');
				})
			)
			.subscribe(
				noop,
				// Обработчик ошибки сработает в 2х случаях:
				// - если юзер ввел некоректный id
				// - если почта, которую ввел юзер, не соответствует почте, что пришла в ответе сервера
				() => alert('Login Failed')
			);
	}
}