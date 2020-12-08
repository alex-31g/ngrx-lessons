import { Component, Input } from "@angular/core";
import { IPost } from "../../model/post.model";

@Component({
  selector: "nl-posts-card-list",
  templateUrl: "./posts-card-list.component.html"
})

export class PostsCardListComponent {

	// Получаем значение переменных allPosts и postsNumb из home.component
	@Input() allPosts: IPost[]
	@Input() postsNumb: number;

}