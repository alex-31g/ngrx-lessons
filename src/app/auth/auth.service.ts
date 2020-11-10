import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "./model/users.model";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	getData(email: string, password: string): Observable<Users[]> {
		// В данном примере параметры email и password не используются

		return this.http.get<Users[]>('https://jsonplaceholder.typicode.com/users')

			// Избавляемся от ненужных полей и приводим полученные объекты в соответствие с интерфейсом Users
			.pipe(
				map(data => {
					console.log('data ==>', data);
					
					return data.map((user: any) => {
						return {id: user.id, name: user.username};
					});
			}))

	}
}