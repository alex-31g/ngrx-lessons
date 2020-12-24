import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IPost } from "./model/post.model";

@Injectable()
export class PostsService {
	constructor(private http: HttpClient) {}

	findAllPosts(): Observable<IPost[]> {
		return this.http.get<IPost[]>('/api/courses');
	}

	findPostById(postUrl: string): Observable<IPost> {
		return this.http.get<IPost>(`/api/courses/${postUrl}`);
	}

	savePost(courseId: number | string, changes: Partial<IPost>) {
		return this.http.put('/api/course/' + courseId, changes);
	}
}