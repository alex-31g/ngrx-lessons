import { Component } from "@angular/core";
import { PostsService } from '../../posts.service';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IPost } from "../../model/post.model";

@Component({
  selector: "nl-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.sass"],
})
export class HomeComponent {

	allPosts$: Observable<IPost[]>;

	constructor(
		private postsService: PostsService,
	) {}

	ngOnInit() {
		this.reload();
	}

	reload() {		
		this.allPosts$ = this.postsService.findAllPosts().pipe(
			tap(post => {
				console.log('all posts ==>', post);
			})
		)
	}

}