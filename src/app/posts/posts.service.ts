import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPost } from "./model/post.model";

@Injectable()
export class PostsService {
	constructor(private http: HttpClient) {}

	findAllPosts(): Observable<IPost[]> {
		return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts/');
	}

	findPostById(postId: string): Observable<IPost> {
		return this.http.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	}

	savePost(postId: number | string, changes: Partial<IPost>) {
		console.log('savePost', postId)
		console.log('savePost', changes)
		return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts/');
	}
}