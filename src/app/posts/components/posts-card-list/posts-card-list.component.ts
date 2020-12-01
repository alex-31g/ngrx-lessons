import { Component, Input } from "@angular/core";
import { IPost } from "../../model/post.model";

@Component({
  selector: "nl-posts-card-list",
  templateUrl: "./posts-card-list.component.html"
})

export class PostsCardListComponent {

	// Получаем значение переменной allPosts из home.component
	@Input()
	allPosts: IPost[]

}