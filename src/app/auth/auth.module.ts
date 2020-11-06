import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),

		/// ngrx has been added to auth-module like feature-module
		StoreModule.forFeature(
			// path for the state which we can see in dev tools
			fromAuth.authFeatureKey, 

			// config reducers for our module
			fromAuth.reducers
		)
	],
	declarations: [LoginComponent],
})
export class AuthModule {}