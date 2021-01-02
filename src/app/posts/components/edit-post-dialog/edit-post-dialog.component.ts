import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPost } from "../../model/post.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { Update } from '@ngrx/entity';
import { PostsEntityService } from '../../posts-entity.service';

@Component({
  selector: 'post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostDialogComponent {

  form: FormGroup;
  dialogTitle: string;
  post: IPost;
  mode: 'create' | 'update';

  constructor(
    private fb: FormBuilder,

    // Компоненты, созданные с помощью MatDialog, могут внедрять MatDialogRef и 
    // использовать его для закрытия диалогового окна
    private dialogRef: MatDialogRef<EditPostDialogComponent>,

    // Данные, переданные из posts-card-list компонента - доступны в переменной data
    // (https://material.angular.io/components/dialog/overview)
    @Inject(MAT_DIALOG_DATA) data,

    // private postsService: PostsService

    // Для получения данных из store мы будем использовать PostsEntityService
    private postsEntityService: PostsEntityService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.post = data.post;
    this.mode = data.mode;

    console.log('MAT_DIALOG_DATA', data)

    const formControls = {
      category: ['', Validators.required],
      description: ['', Validators.required],
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);

      // Передаем методу patchValue объект, полученный из posts-card-list компонента.
      // Несмотря на то, что объект содержит много полей -
      // метод patchValue берет из него только поля, описанные в formControls - category, description
      this.form.patchValue({...data.post});
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const post: IPost = {
      ...this.post,
      ...this.form.value
    };

    if (this.mode === 'update') {
      // Метод update входит в состав EntityService - он выполняет put-запросы к серверу
      // (update строит url запроса по специальной конвенции - но в нашем случаи
      // - необходимо задать кастомный url - см. post-data.service),
      // и сохраняет обновленные данные в store
      this.postsEntityService.update(post);

      // Закрываем окно редактирования
      this.dialogRef.close();
    } else if (this.mode === 'create') {
      // Метод add входит в состав EntityService - он выполняет post-запросы к серверу
      // (add строит url запроса по специальной конвенции - но в нашем случаи
      // - необходимо задать кастомный url - см. post-data.service),
      // и сохраняет обновленные данные в store.
      // По умолчанию add - pesimistic метод.
      this.postsEntityService.add(post)
        .subscribe(
          newPost => {
            console.log('New post', newPost);
            this.dialogRef.close();
          }
        )
    }

    // =====================
    // Старый код
    // this.postsService.savePost(post.id, post)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )

    // const update: Update<IPost> = {
    //   id: post.id,
    //   changes: post
    // }
  }

}
