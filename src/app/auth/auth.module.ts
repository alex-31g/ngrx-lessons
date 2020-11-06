import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		/// ngrx has been added to auth-module like feature-module
		StoreModule.forFeature(
			// path for the state which we can see in dev tools
			fromAuth.authFeatureKey, 

			// config reducers for our module
			fromAuth.reducers
		)
	],
	declarations: [RegisterComponent],
})
export class AuthModule {}