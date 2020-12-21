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
export interface PostsState extends EntityState<IPost> {
	// Флаг, который говорит - загружены посты (true) или нет (false):
	allPostsLoadedFlag: boolean
}

// Создаем адаптер с помощью метода createEntityAdapter:
export const adapter = createEntityAdapter<IPost>();

// Создаем начальное состояние posts-модуля с помощью метода getInitialState.
// В результате вызова adapter.getInitialState(),
// переменная initialPostsState будет хранить пустой массив ids и пустой объект entities
export const initialPostsState = adapter.getInitialState(
	// Присваиваем начальное значение флагу allPostsLoaded: 
	{ allPostsLoadedFlag: false }
);

// Создаем редюсер с помощью метода createReducer
export const postsReducer = createReducer(

	initialPostsState,

	// Данный редюсер слушает allPostsLoaded action и он должен
	// сохранять посты в store в Entity State формате
	on(
		PostsActions.allPostsLoaded,
		// Следующий метод 1м аргументом принимает предыдущий state, вторым - action,
		// возвращает в store новую версию состояния в Entity State формате:
		(state, action) => adapter.addMany(
			action.posts, 
			{
				... state,
				allPostsLoadedFlag: true
			}
		) 
	),

	// Данный редюсер слушает postUpdated action и он должен
	// сохранять в store один измененный пост в Entity State формате.
	// Первым параметром метод on() принимает action;
	// Вторым - что нужно делать в ответ на получение данного action.
	// on() возвратит новую версию стейта
	on(
		PostsActions.postUpdated, 
		// updateOne - adapter-метод для обновления одного элемента store в Entity State формате
		(state, action) => adapter.updateOne( 
			// Пост, который изменил юзер
			action.update,

	  	// Предыдущее состояние
			state
		)
		/*
			action = {
				type: "[Edit Post Dialog] Post Updated",
				update: {
					id: '111',
					changes: {
						userId: 1,
						id: '111',
						title: 'post',
						body: ''
					}
				}
			}

			state = {
				ids: [1,2,...100],
				entities: { 100 объектов постов }
			}
		*/
	)

);

export const {
	selectAll
} = adapter.getSelectors();
/*
Метод getSelectors() - возвращает селекторы:
selectIds - возвращает массив идентификаторов сущностей;
selectEntities - возвращает объект, в котором ключи это идентификаторы записей, а значения - сами записи;
selectAll - возвращает массив всех сущностей;
selectTotal - возвращает общее количество записей в массиве.
*/
