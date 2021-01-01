import { Component } from "@angular/core";
import { PostsService } from '../../posts.service';
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { IPost, compareCourses } from "../../model/post.model";
import { PostsEntityService} from '../../posts-entity.service';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from "../edit-post-dialog/edit-post-dialog.component";

@Component({
  selector: "nl-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})

export class HomeComponent {
	allPosts$: Observable<IPost[]>;
	numb: any;

	constructor(
		// private postsService: PostsService,

		// Для получения данных из store мы будем использовать PostsEntityService
		private postsEntityService: PostsEntityService,

		private dialog: MatDialog,
	) {}

	ngOnInit() {
		this.reload();
	}

	reload() {		
		console.warn('RELOAD FUNCTION IN HOME COMPONENT');

		// Получение данных из store с использованием entity-сервиса
		// Внутри postsEntityService метода существует метод entities$ -
		// это observable, который эмитит данные как только данные
		// появились в store
		this.allPosts$ = this.postsEntityService.entities$
			.pipe(
				tap(post => {
					console.log('all posts ==>', post);
				})
			)

		this.numb = this.postsEntityService.entities$
			.pipe(
				map(post => post.filter((item, i, arr) => i % 2 === 0).length)
			)

		// Получение данных от сервера с использованием http-сервиса
		// this.allPosts$ = this.postsService.findAllPosts().pipe(
		// 	map(res => res['payload']),
		// 	map(courses => courses.sort(compareCourses)),
		// 	tap(post => {
		// 		console.log('all posts ==>', post);
		// 		this.numb = post.filter((item, i, arr) => i % 2 === 0).length;
		// 	})
		// )
		
	}

  onAddCourse() {
		// В dialogConfig получаем базовые настройки нашего окна редактирования
    const dialogConfig = defaultDialogConfig();

		// Записываем в dialogConfig.data данные, которые мы хотим передать 
		// edit-post-dialog компоненту, который содержит material-модуль MatDialog
		// (https://material.angular.io/components/dialog/overview)
    dialogConfig.data = {
      dialogTitle:"Create Course",
      mode: 'create'
    };

		// Метод open - будет вызван, когда пользователь откроет окно:
    // 1й параметр - компонент, который необходимо отобразить при открытии окна
    // 2й параметр - объект с настройками  и данными
    this.dialog.open(EditPostDialogComponent, dialogConfig);
  }
}