import { Component } from "@angular/core";
import { PostsService } from '../../posts.service';
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { IPost, compareCourses } from "../../model/post.model";

@Component({
  selector: "nl-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})

export class HomeComponent {
	allPosts$: Observable<IPost[]>;
	numb: any;

	constructor(
		private postsService: PostsService,
	) {}

	ngOnInit() {
		this.reload();
	}

	reload() {		
		console.warn('RELOAD FUNCTION IN HOME COMPONENT');

		this.allPosts$ = this.postsService.findAllPosts().pipe(
			map(res => res['payload']),
			map(courses => courses.sort(compareCourses)),
			tap(post => {
				console.log('all posts ==>', post);
				this.numb = post.filter((item, i, arr) => i % 2 === 0).length;
			})
		)
		
	}
}