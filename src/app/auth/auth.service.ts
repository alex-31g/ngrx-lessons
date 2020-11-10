import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUsers } from "./model/users.model";
import { IUsers_back } from "./model/users.model";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	getData(email: string, id: string): Observable<IUsers> {
		return this.http.get<IUsers_back>(`https://jsonplaceholder.typicode.com/users/${id}`)

			.pipe(
				map(data => {
					console.log('data ==>', data);
					
					// Если почта, которую ввел юзер, не соответствует почте, что пришла в ответе сервера - метод возвратит undefined
					if (email === data.email) {
						// Избавляемся от ненужных полей и приводим полученный объект в соответствие с интерфейсом IUsers
						return { index: data.id, name: data.username, mail: data.email }
					}
			}))
	}
}