import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../model/post.model';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { PostsEntityService } from "../../posts-entity.service";
import { LessonsEntityService } from "../../lessons-entity.service";
import { ILesson } from "../../model/lesson";

@Component({
  selector: "nl-post",
	templateUrl: "./post.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent {
	loading$: Observable<boolean>;
	post$: Observable<IPost>;
	lessons$: Observable<ILesson[]>;
	displayedColumns = ['seqNo', 'description', 'duration'];
	nextPage = 0;

  constructor(
		private route: ActivatedRoute,
		// С помощью PostsEntityService мы будем получать данные из store
		private postsEntityService: PostsEntityService,

		// С помощью LessonsEntityService мы будем обращаться
		// к серверу и сохранять данные в store
		private lessonEntityService: LessonsEntityService,
	) {}
	
	ngOnInit() {
		const postUrl = this.route.snapshot.paramMap.get("postUrl");
		// this.post$ = this.postsService.findPostById(postUrl);

		// Получение данных из store с использованием entity-сервиса
    // Внутри postsEntityService метода существует метод entities$ -
    // это observable, который эмитит данные как только данные
		// появились в store
		// Внутри this.postsEntityService.entities$ находятся все посты
		this.post$ = this.postsEntityService.entities$
			.pipe(
				tap(posts => console.log('posts', posts)),
				// При первом совпадении post.url == postUrl ->
				// результат будет присвоен в this.post$
				map(posts => posts.find(post => post.url == postUrl))
			)

		// Получение данных из store с использованием entity-сервиса
    // Внутри lessonEntityService метода существует метод entities$ -
    // это observable, который эмитит данные как только данные
		// появились в store.
		// Внутри this.lessonEntityService.entities$ находятся все уроки
		this.lessons$ = this.lessonEntityService.entities$
			.pipe(
				// Получить данные постов можно обратившись к post$ observable.
				// Чтобы внутри текущего lessons$ observable обратиться к 
				// данным другого observable - используем rxjs-метод withLatestFrom - 
				// данный метод делает микс двух observable и создает новый observable
				// который эмитит пары значений - в нашем случаи эти пары - 
				// это lessons-entity и post-entity
				withLatestFrom(this.post$),
				tap(([lessons, post]) => {

					console.log('\n', 'lessons', lessons, '\n', 'posts', post);

					if (this.nextPage == 0) {
						this.loadLessonsPage(post);
					}					
				}),
				// Отфильтровываем уроки по id -
				// если id урока == id поста - показываем этот урок
				map(([lessons, post]) => lessons.filter(lesson => lesson.courseId === post.id))
			);
		
		// Когда loading$ = true, это значит что происходит запрос к бекенду
		// - спинер должен отображаться
		this.loading$ = this.lessonEntityService.loading$
			.pipe(
				delay(0)
			)

	}

	// loadLessonsPage будет делать запросы с серверу
	// и сохранять результат в store
	loadLessonsPage(post: IPost) {
		// Метод getWithQuery входит в состав EntityService - он выполняет get-запросы к серверу
		// используя query-параметры и сохраняет данные в store
		// (все методы EntityService строят url запросов по специальной конвенции, которую можно 
		// переписать внутри post-data.service, как мы делали раньше. Но в данном случаи этого делать не нужно).
		// Данный метод построит url такого вида:
		// http://localhost:4200/api/lessons/?courseId=4&pageNumber=1&pageSize=3
		this.lessonEntityService.getWithQuery({
			'courseId': post.id.toString(),
			'pageNumber': this.nextPage.toString(),
			'pageSize': '3'
		});

		this.nextPage += 1;
	}

}