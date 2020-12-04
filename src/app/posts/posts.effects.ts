import { allPostsLoaded } from './posts.actions';
import { PostsService } from './posts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsActions } from './action-types';
import { map, mergeMap } from 'rxjs/operators';

// Классы эффектов не инжектятся в другие места приложения, как это можно делать с классами сервисов.

@Injectable()
export class PostsEffects {

	// createEffect() - принимает функцию, которая возвращает observable
	loadPosts$ = createEffect(
		() => this.action$.pipe(

			// ofType - используется для фильтрации действий по их типу -
			// при возникновении loadAllPosts действия -
			// будет выполнен запрос к серверу для получения данных
			ofType(PostsActions.loadAllPosts),
			mergeMap(action => this.postHttpService.findAllPosts()),

			// После получения данных от сервера - отправляем новый action - allPostsLoaded,
			// передавая в качестве payload - полученные от сервера данные
			map(posts => allPostsLoaded({posts}))

		)
	)

	// Инжектим сервис Actions, который является частью библиотеки ngrx/effects
	constructor(
		private action$: Actions, 
		private postHttpService: PostsService
	){}

}