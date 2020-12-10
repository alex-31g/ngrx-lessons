import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../model/post.model';
import { PostsService } from '../../posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: "nl-post",
  templateUrl: "./post.component.html"
})

export class PostComponent {

	loading$: Observable<boolean>;

	post$: Observable<IPost>;

  constructor(
		private route: ActivatedRoute,
    private postsService: PostsService
	) {}
	
	ngOnInit() {
		const postId = this.route.snapshot.paramMap.get("postId");
		this.post$ = this.postsService.findPostById(postId);

		// Переводим значение в boolean:
		// если в posts есть данные - получим true, если нет - false
		// То-есть, пока данных нет мы имеем false - спинер должен отображаться
		this.loading$ = this.post$.pipe(map(posts => !!posts));

  }

}