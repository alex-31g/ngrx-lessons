import { createSelector } from '@ngrx/store';

// Селектор создается с помощью createSelector().
// В createSelector() необходимо передать минимум 2 ф-ции-аргумента - mapping и projector:

export const isLoggedIn = createSelector(
	// Первый аргумент - mapping-функция, которая извлекает только необходимый кусок состояния из store (например объект 'auth').
	// Аргументом принимает глобальный state
	state => state["auth"],

	// Второй аргумент - projector-функция - отдает результат работы селектора - true/false, информируя, авторизирован ли юзер или нет.
	// Аргументом принимает тот кусок состояния, который мы получили с помощью mapping-функции
	auth => !!auth.user
);

export const isLoggedOut = createSelector(
	// Первый аргумент - mapping-функция - но мы её не будем создавать, а передадим на её место ранее созданный isLoggedIn селектор
	isLoggedIn,

	loggedIn => !loggedIn
);