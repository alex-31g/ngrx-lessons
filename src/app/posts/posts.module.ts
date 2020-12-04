import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PostsCardListComponent } from './components/posts-card-list/posts-card-list.component';
import { PostComponent } from './components/post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsService } from "./posts.service";
import { PostsResolver } from './posts.resolver';
import { PostsEffects } from './posts.effects';

const postsRoutes: Routes = [
	{ 
		path: '', 
		component: HomeComponent, 

		// Чтобы сообщить роутеру, что перед переходом на HomeComponent необходимо обработать резолвер -
		// его необходимо подключить следующим образом:
		resolve: {
			posts: PostsResolver
		} 
	},

  { path: ':postId', component: PostComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(postsRoutes),
		EffectsModule.forFeature([PostsEffects])
	],
	declarations: [
		HomeComponent, 
		PostsCardListComponent,
		PostComponent,
	],
	providers: [
		PostsService,
		PostsResolver,
  ]
})
export class PostsModule {
}