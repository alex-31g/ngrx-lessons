import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { IUsers } from "../../model/users.model";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Component({
  selector: "nl-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent {

	form: FormGroup;

	user: IUsers;

	constructor(
		private fb: FormBuilder,	
		private auth: AuthService,
		private router: Router,
	) {
		this.form = fb.group({
			email: ['Lucio_Hettinger@annie.ca', [Validators.required, Validators.email]],
			id: ['5', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
		});
	}

	login() {
		const val = this.form.value;
		console.log(val);

		this.auth.getData(val.email, val.id)
			.pipe(
				// tap() используется для выполнения какого-либо действия; не изменяет исходного значения
				tap(user => {
					console.log('user ==>', user);
					if (!user) throw new Error;
				})
			)
			.subscribe(
				(users) => {
					this.user = users;
					
					this.router.navigateByUrl('/posts');
				},
				// Обработчик ошибки сработает в 2х случаях:
				// - если юзер ввел некоректный id
				// - если почта, которую ввел юзер, не соответствует почте, что пришла в ответе сервера
				() => alert('Login Failed')
			);

	}
}