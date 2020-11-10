import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Users } from "../../model/users.model";
@Component({
  selector: "nl-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent {

	form: FormGroup;

	users: Users[] = [];

	constructor(
		private fb: FormBuilder,	
		private auth: AuthService
	) {
		this.form = fb.group({
			email: ['test@test.com', [Validators.required, Validators.email]],
			password: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]]
		});
	}

	login() {
		const val = this.form.value;
		console.log(val);

		// email и password, которые ввел пользователь, должны отправляться на сервер.
		// Сервер должен проверять их и отдавать необходимые нам данные.
		// Но в нашем примере эта проверка будет сэмулирована внутри данного метода и,
		// если она успешна, мы выполним обращение к сервису, который запросит у сервера данные,
		// без использования email и password

		if (val.email !== 'test@test.com' || val.password !== 'test') {
			console.log('Wrong user data');
			return;
		}

		this.auth.getData(val.email, val.password)
			.subscribe((users) => {
				this.users = users;
				console.log('users ==>', this.users);
			});
	}
}