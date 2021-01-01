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
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PostsEntityService} from './posts-entity.service';
import { PostsResolver} from './posts.resolver';
import { PostsDataService} from './posts-data.service';
import { compareCourses } from './model/post.model';

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

  { path: ':postUrl', component: PostComponent },
];

// Создаем конфигурацию для Post-entity.
// Этот объект будет содержать по одной записи для каждой сущности в нашем приложении
const entityMetadata: EntityMetadataMap = {
  // Сущность Post
	Post: {
		// Передаем ф-цию сортировки
		sortComparer: compareCourses,
		
		// optimisticUpdate: true - обновление store в optimistic способ -
		// не дожидаясь ответа от сервера - store будет обновлен.
		// Если не задать этот флаг - обновление store будет происходить в pesimistic способ -
		// store будет обновлен после того, как будет получен ответ от сервера
		entityDispatcherOptions: {
			optimisticUpdate: true,
			// optimisticAdd: true	
		}
	}
}

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
		PostsEntityService,
		PostsResolver,
		PostsDataService,
  ]
})
export class PostsModule {
	constructor(
		// Поскольку post.module - это lazy load модуль, 
		// нам нужно добавить новый сервис - EntityDefinitionService, 
		// который мы будем использовать для регистрации конфигурации entityMetadata 
		private eds: EntityDefinitionService,

		// entityDataService - с помощью данного сервиса можно 
    // регистрировать data-сервисы для наших entity
		private entityDataService: EntityDataService,

		// PostsDataService - data-сервис, который мы создали для обращений к бекенду
		private postsDataService: PostsDataService,
	) {
		eds.registerMetadataMap(entityMetadata);

		// Указываем, что postsDataService необходимо использовать при обращение к бекенду,
		// вместо того, чтоб использовать стандартное поведение ndrx/data 
		// (описание стандартного поведения см. п.39.2)
		entityDataService.registerService('Post', postsDataService);
	}
}