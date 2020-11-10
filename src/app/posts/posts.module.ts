import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';

const postsRoutes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(postsRoutes)
	],
	declarations: [HomeComponent],
})
export class PostsModule {
}