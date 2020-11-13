import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ModuleWithProviders } from '@angular/core';
import { AuthService } from "./auth.service";
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { authReducer } from './reducers';

const authRoutes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(authRoutes),
		ReactiveFormsModule,

		// ngrx has been added to auth-module like feature-module
		StoreModule.forFeature(
			// path for the state which we can see in dev tools
			fromAuth.authFeatureKey, 
			// config reducers for our module
			authReducer)
	],
	declarations: [LoginComponent],
})

export class AuthModule {
	static forRoot(): ModuleWithProviders<AuthModule> {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService
			]
		}
	}
}