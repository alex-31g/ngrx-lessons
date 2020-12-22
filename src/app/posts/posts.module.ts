import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PostsCardListComponent } from './components/posts-card-list/posts-card-list.component';
import { PostComponent } from './components/post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsService } from "./posts.service";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostDialogComponent } from './components/edit-post-dialog/edit-post-dialog.component';

const postsRoutes: Routes = [
	{ 
		path: '', 
		component: HomeComponent, 
	},

  { path: ':postId', component: PostComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(postsRoutes),
		MatProgressSpinnerModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	declarations: [
		HomeComponent, 
		PostsCardListComponent,
		PostComponent,
		EditPostDialogComponent,
	],
	providers: [
		PostsService,
  ]
})
export class PostsModule {
}