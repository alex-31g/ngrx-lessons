import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap, first } from "rxjs/operators";
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

    // С помощью PostsEntityService получаем доступ к флагу loaded
    return this.postsEntityService.loaded$
      .pipe(
        tap(loaded => {
          // Если флаг loaded == false - это значит, что данные еще не  
          // скачанные в store и сработает getAll-метод,
          // который выполнит запрос на сервер и сохранит результат в store
          if (!loaded) {
            // Метод getAll входит в состав EntityService - он выполняет get-запросы
            // и сохраняет полученный от сервера результат в store
            this.postsEntityService.getAll();
          }
        }),
        // Мы указали, что Observable метода resolve должен вернуть boolean,
        // то-есть только когда будет возвращено true - route-переход сможет завершить работу.
        // Здесь filter гарантирует, что мы дождемся загрузки данных в хранилище.
        // Переводим значение в boolean:
        // если в loaded есть данные - получим true, если нет - false
        filter(loaded => !!loaded),
        // Метод first() возвратит первое полученное из потока значение,
        // и завершит Observable
        first()
      )

    // ==============================
    // Старая логика уже не нужна
    // 
    // // Метод getAll входит в состав EntityService - он выполняет get-запросы
    // // и сохраняет полученный от сервера результат в store
    // return this.postsEntityService.getAll()
    //   .pipe(
    //     // Мы указали, что данный Observable должен вернуть boolean,
    //     // то-есть когда будет возвращено true - route-переход сможет завершить работу.
    //     // Переводим значение в boolean:
    // 		 // если в posts есть данные - получим true, если нет - false
    //     map(posts => !!posts)
    //   )
    // ==============================
  }

}