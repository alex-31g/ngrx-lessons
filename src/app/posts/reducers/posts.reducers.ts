import { IPost } from './../model/post.model';
import { EntityState } from '@ngrx/entity'


export interface PostsState extends EntityState<IPost> {
	// posts: IPost[];

	// entities: {[key:string]: IPost},
	// ids: number[]
}
