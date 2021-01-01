import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ILesson } from './model/lesson'

@Injectable()
export class LessonsEntityService extends EntityCollectionServiceBase<ILesson> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    // 'Lesson' - соответствует записи в entityMetadata-конфигурации
    // в файле src\app\posts\posts.module.ts
    super('Lesson', serviceElementsFactory);
  }
}