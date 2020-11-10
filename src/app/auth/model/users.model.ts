// Cвойства в объекте, который возвращает метод getData в 'src\app\auth\auth.service.ts'
export interface IUsers {
	index: string;
	name: string;
	mail: string;
}

// Cвойства в объекте, который пришел от сервера
export interface IUsers_back {
	id: string;
	username: string;
	email: string;
}