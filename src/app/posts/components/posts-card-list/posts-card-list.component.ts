import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "../../model/post.model";
import { MatDialog } from "@angular/material/dialog";
import { EditPostDialogComponent } from "../edit-post-dialog/edit-post-dialog.component";
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { PostsEntityService } from "../../posts-entity.service";

@Component({
  selector: "nl-posts-card-list",
  templateUrl: "./posts-card-list.component.html"
})

export class PostsCardListComponent {

	// Получаем значение переменных allPosts и postsNumb из home.component
	@Input() allPosts: IPost[]
	@Input() postsNumb: number;

	@Output() postChanged = new EventEmitter();

	constructor(
		private dialog: MatDialog,
		private postsEntityService: PostsEntityService,
	) {}

	editPost(post: IPost) {
		// В dialogConfig получаем базовые настройки нашего окна редактирования
		const dialogConfig = defaultDialogConfig();

		// Записываем в dialogConfig.data данные, которые мы хотим передать 
		// edit-post-dialog компоненту, который содержит material-модуль MatDialog
		// (https://material.angular.io/components/dialog/overview)
		dialogConfig.data = {
			dialogTitle: "Edit Course",
			post,
			mode: 'update'
		};

		console.log('dialogConfig', dialogConfig);
		
		// Метод open - будет вызван, когда пользлватель откроет окно:
		// 1й параметр - компонент, который необходимо отобразить при открытии окна
		// 2й параметр - объект с настройками и данными
		// После того, как окно будет закрыто - сработает this.postChanged.emit() -
		// данное событие будет отправленно вверх родительским компонентам и
		// будет перехвачено в home-компоненте
		this.dialog.open(EditPostDialogComponent, dialogConfig)
			.afterClosed()
			.subscribe(() => this.postChanged.emit());
	}

	onDeletePost(post: IPost) {
		console.log('delete', post);
		// Метод delete входит в состав EntityService - он выполняет delete-запросы к серверу
		// (delete строит url запроса по специальной конвенции - но в нашем случаи
		// - необходимо задать кастомный url - см. post-data.service),
		// и также удаляет данные в store.
		// По умолчанию delete - optimistic метод.
		// Возвратит observable, когда удаление на бекенде будет выполнено,
		// но нам не нужно на него подписываться
		this.postsEntityService.delete(post)
			.subscribe(
				() => console.log('Delete completed'),
				err => console.log('Delete failed', err)
			)
  }
}