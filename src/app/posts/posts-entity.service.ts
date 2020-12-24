import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { IPost } from './model/post.model'

@Injectable()
export class PostsEntityService extends EntityCollectionServiceBase<IPost> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    // 'Post' - соответствует записи в entityMetadata-конфигурации
    // в файле src\app\posts\posts.module.ts
    super('Post', serviceElementsFactory);
  }
}