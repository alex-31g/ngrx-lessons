import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPost } from "./model/post.model";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { map } from "rxjs/operators";

@Injectable()
export class PostsDataService extends DefaultDataService<IPost> {

  constructor(
    http: HttpClient, 

    // С помощью HttpUrlGenerator мы предоставляем ngrx/data
    // кастомный url для нашего API
    httpUrlGenerator: HttpUrlGenerator,
  ) {
    // 'Post' - имя entity, который определен в 
    // src\app\posts\posts.module.ts в entityMetadata
    super('Post', http, httpUrlGenerator);
  }

  // выполняем over-write метода getAll, перезатирая его стандартное поведение
  getAll(): Observable<IPost[]> {
    // '/api/courses' - кастомный url по которому стучаться при работе с 'Post' entity
    return this.http.get<IPost[]>('/api/courses')
      .pipe(
        // Трансформируем результат полученный с бека в массив
        map(res => res['payload'])
      )
  }

  // выполняем over-write метода update, перезатирая его стандартное поведение
  update(post): Observable<IPost> {
    // `/api/course/${post.id}` - кастомный url 
    return this.http.put<IPost>(`/api/course/${post.id}`, post.changes);
  }

  // выполняем over-write метода add, перезатирая его стандартное поведение
  add(newPost): Observable<IPost> {
    // `/api/course/` - кастомный url 
    return this.http.post<IPost>(`/api/course/`, newPost);
  }
}