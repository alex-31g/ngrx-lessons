import { Update } from '@ngrx/entity';
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

// postUpdated - это действие будет вызвано в 'src\app\posts\components\edit-post-dialog\edit-post-dialog.component.ts' в случае, когда пользователь нажмет кнопку сохранения в окне редактирования поста
export const postUpdated = createAction(
	// Первое свойство type - задаем с учетом специальной naming-convention: 
	// [Edit Post Dialog] - место, где происходит action
	// Post Updated - событие, с помощью которого мы информируем store о том, что пользователь внес правки в пост
	'[Edit Post Dialog] Post Updated',

	// Второе свойство payload - задаем с помощью rxjs-метода props.
	// props - не принимает никаких аргументов, но принимает один дженерик параметр, который указывает тип данных для payload.
	// Указываем, что payload'ом должен быть объект с одним свойством update типа Update<IPost>.
	// Тип Update - это специальный ngrx-тип, который позволяет модифицировать данные в store, 
	// если они имеют entity-формат.
	// Экземпляр типа Update будет имеет 2 свойства - id и changes
	props<{update: Update<IPost>}>()
)