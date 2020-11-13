import { createAction, props } from '@ngrx/store';
import { IUsers } from './model/users.model';

export const loginAction = createAction(
	// Первое свойство type - задаем с учетом специальной naming-convention: 
	// [Login Page] - место, где происходит action
	// User Login - событие, с помощью которого мы информируем store о том, что пользователь вошел в систему
	"[Login Page] User Login",

	// Второе свойство payload - задаем с помощью rxjs-метода props.
	// props - не принимает никаких аргументов, но принимает один дженерик параметр, который указывает тип данных для payload.
	// Указываем, что payload'ом должен быть объект с одним свойством user типа IUsers
	props<{user: IUsers}>()
);

export const logoutAction = createAction(
	// Первое свойство type - задаем с учетом специальной naming-convention: 
	// [Top Menu] - место, где происходит action - в верхнем меню
	// User Logout - событие, с помощью которого мы информируем store о том, что пользователь вышел из системы
	"[Top Menu] User Logout",

	// Второе свойство payload - не нужно для данного action
);