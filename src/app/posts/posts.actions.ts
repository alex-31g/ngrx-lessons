import { createAction, props } from '@ngrx/store';
import { IPost } from "./model/post.model";

// loadAllPosts - это действие будет вызвано в 'src\app\posts\posts.resolver.ts' в случае, если данные от сервера не сохранены в store.
// Оно будет вызвано до того, как будет выполнен переход на страницу posts, чтобы не показывать пользователю пустой экран
export const loadAllPosts = createAction(
	// [Posts Resolver] - место, где происходит action
	// Load All Posts - событие, с помощью которого мы информируем store о том, что началась загрузка постов
	'[Posts Resolver] Load All Posts'
) 

export const allPostsLoaded = createAction(
	// [Load Posts Effect] - место, где происходит action
	// All Posts Loaded - событие, с помощью которого мы информируем store о том, что загружены все посты
	'[Load Posts Effect] All Posts Loaded',
	props<{posts: IPost[]}>()
) 
