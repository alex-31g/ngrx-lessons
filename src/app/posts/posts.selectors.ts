import { PostsState } from './reducers/posts.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPosts from './reducers/posts.reducers';

// С помощью createFeatureSelector создаем feature-селектор selectPostsState - 
// - который извлекает из store все данные состояния 'posts':
export const selectPostsState = createFeatureSelector<PostsState>('posts');

// С помощью createSelector создаем селектор selectAllPosts -
// - который будет возвращать из store все данные состояния 'posts'.
// В createSelector необходимо передать минимум 2 ф-ции-аргумента:
export const selectAllPosts = createSelector(

	// Первый аргумент - mapping-функция - извлекает необходимый кусок состояния из store,
	// но мы её не будем реализовывать, а передадим на её место результат работы селектора selectPostsState
	selectPostsState,

	// Второй аргумент - projector-функция - возвращает результат работы селектора.
	// Аргументом принимает тот кусок состояния, который мы получили с помощью mapping-функции, 
	// в нашем случаи это состояние 'posts' в котором есть -
	// 1) объект entities:
	// {
	// 	0: {
	// 		body: "quia et suscipi",
	// 		id: 1,
	// 		title: "sunt aut facere",
	// 		userId: 1,                   
	// 	},
	// 	...
	// 	99: {
	// 		body: "quia et suscipi",
	// 		id: 100,
	// 		title: "sunt aut facere",
	// 		userId: 100,                   
	// 	},
	// }
	// 
	// 2) массив ids:
	// [1, 2, ... 100]
	// 
	// Получить доступ к этим данным можно воспользовавшись функцией:
	// state => {
	// 	console.log(state.entities)
	// 	console.log(state => state.ids)
	// }
	// 
	// Поскольку entities хранится в объекте, а ids - в массиве, то, чтобы корректно работать с объектном entities,
	// его нужно преобразовать в массив объектов, согласно индексам массива ids.
	// Чтобы не выполнять данную задачу вручную, можно воспользоваться методом selectAll, который предоставляет adapter.
	// selectAll извлечет entities и ids из состояния 'posts' и возвратит массив объектов:
	fromPosts.selectAll
);

// С помощью createSelector создаем селектор selectPostsNumber -
// - который будет возвращать колличество четных постов.
export const selectPostsNumber = createSelector(

	// Первый аргумент - mapping-функция - извлекает необходимый кусок состояния из store,
	// но мы её не будем реализовывать, а передадим на её место результат работы селектора selectAllPosts,
	// то-есть, мы получим массив объектов состояния 'posts'
	selectAllPosts,

	// Второй аргумент - projector-функция - отдает результат работы селектора.
	// Аргументом принимает тот кусок состояния, который мы получили с помощью mapping-функции
	posts => posts.filter((item, i, arr) => i % 2 === 0).length
);    