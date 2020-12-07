import { IPost } from './../model/post.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PostsActions } from '../action-types';

// Интерфейс PostsState - соответствует Entity State формату:
// export interface PostsState {
// 	ids: string[] | number[];
// 	entities: {[key:string]: IPost},
// }

// Интерфейс PostsState, закоментированный выше, можно написать проще, используя класс EntityState:
export interface PostsState extends EntityState<IPost> {}

// Создаем адаптер с помощью метода createEntityAdapter:
export const adapter = createEntityAdapter<IPost>();

// Создаем начальное состояние posts-модуля с помощью метода getInitialState.
// В результате вызова adapter.getInitialState(),
// переменная initialPostsState будет хранить пустой массив ids и пустой объект entities
export const initialPostsState = adapter.getInitialState();

// Создаем редюсер с помощью метода createReducer.
// Данный рудюсер слушает allPostsLoaded action и он должен
// сохранять посты в store в Entity State формате
export const postsReducer = createReducer(
	initialPostsState,
	on(
		PostsActions.allPostsLoaded,
		// Следующий метод 1м аргументом принимает предыдущий state, вторым - action,
		// возвращает в store новую версию состояния в Entity State формате:
		(state, action) => adapter.addMany(action.posts, state) 
	)
)
