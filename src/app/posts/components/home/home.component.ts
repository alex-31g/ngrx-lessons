import { selectAllPosts, selectPostsNumber } from './../../posts.selectors';
import { Component } from "@angular/core";
import { PostsService } from '../../posts.service';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IPost } from "../../model/post.model";
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: "nl-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})

export class HomeComponent {
	allPosts$: Observable<IPost[]>;
	numb$: Observable<number>;

	constructor(
		// private postsService: PostsService,
		private store: Store<AppState>
	) {}

	ngOnInit() {
		this.reload();
	}

	reload() {		
		console.warn('RELOAD FUNCTION IN HOME COMPONENT');

		// this.allPosts$ = this.postsService.findAllPosts().pipe(
		// 	tap(post => {
		// 		console.log('all posts ==>', post);
		// 		this.numb = post.filter((item, i, arr) => i % 2 === 0).length;
		// 	})
		// )

		this.allPosts$ = this.store.pipe(select(selectAllPosts));

		// В this.numb получаем колличество четных постов 
		this.numb$ = this.store.pipe(select(selectPostsNumber));
	}
}