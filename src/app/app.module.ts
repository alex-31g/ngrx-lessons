import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

const routes: Routes = [
	{ 
		path: 'posts', 
		loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule), 
		// canActivate свойство указывает, что этот роут защищен AuthGuard сервисом
		canActivate: [AuthGuard] 
	},
	
	// Если задан неизвестный путь - перенаправить к '/'
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		AuthModule.forRoot(),
		RouterModule.forRoot(routes),
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
			}
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
			routerState: RouterState.Minimal
		}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
