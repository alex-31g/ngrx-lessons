import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PostsCardListComponent } from './components/posts-card-list/posts-card-list.component';
import { PostComponent } from './components/post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsService } from "./posts.service";

const postsRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':postId', component: PostComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(postsRoutes)
	],
	declarations: [
		HomeComponent, 
		PostsCardListComponent,
		PostComponent
	],
	providers: [
    PostsService
  ]
})
export class PostsModule {
}