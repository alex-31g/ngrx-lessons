import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "nl-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent {

	form: FormGroup;

	constructor(
		private fb: FormBuilder,		
	) {
		this.form = fb.group({
			email: ['test@test.com', [Validators.required, Validators.email]],
			password: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]]
		});
	}

	login() {
		const val = this.form.value;
		console.log(val);
	}
}