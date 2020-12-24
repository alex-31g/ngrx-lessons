import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PostsEntityService } from "./posts-entity.service";

@Injectable()
// Resolver сервисы необходимо наследовать от Resolve класса
export class PostsResolver implements Resolve<boolean> { 
  
  constructor(
    // Для получения данных с сервера мы будем использовать PostsEntityService
    private postsEntityService: PostsEntityService
  ) {}

  // Resolver сервис имеет один обязательный метод resolve(), который принимает несколько аргументов:
	// - route: ActivatedRouteSnapshot - содержит иформацию об текущем url
	// - state: RouterStateSnapshot - содержит текущий стейт роутера
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    // Метод getAll входит в состав EntityService - он выполняет get-запросы
    // и сохраняет полученный от сервера результат в store
    return this.postsEntityService.getAll()
      .pipe(
        // Мы указали, что данный Observable должен вернуть boolean,
        // то-есть когда будет возвращено true - route-переход сможет завершить работу.
        // Переводим значение в boolean:
				// если в posts есть данные - получим true, если нет - false
        map(posts => !!posts)
      )
  }

}