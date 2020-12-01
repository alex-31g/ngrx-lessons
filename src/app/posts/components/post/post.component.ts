import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../../model/post.model';
import { PostsService } from '../../posts.service';

@Component({
  selector: "nl-post",
  templateUrl: "./post.component.html"
})

export class PostComponent {

	post$: Observable<IPost>;

  constructor(
		private route: ActivatedRoute,
    private postsService: PostsService
	) {}
	
	ngOnInit() {
		const postId = this.route.snapshot.paramMap.get("postId");
		this.post$ = this.postsService.findPostById(postId);
  }

}