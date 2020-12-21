import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPost } from "../../model/post.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Update } from '@ngrx/entity';
import { postUpdated } from '../../posts.actions';

@Component({
  selector: 'post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.sass']
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

    // private postsService: PostsService // <-- обращение к postsService.savePost - удаляем
    private store: Store<AppState>
  ) {
    this.dialogTitle = data.dialogTitle;
    this.post = data.post;
    this.mode = data.mode;

    console.log('MAT_DIALOG_DATA', data)

    const formControls = {
      title: ['', Validators.required],
      body: ['', Validators.required],
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);

      // Передаем методу patchValue объект, полученный из posts-card-list компонента.
      // Несмотря на то, что объект содержит 4 поля - body, id, title, userId -
      // метод patchValue берет из него только поля, описанные в formControls - title, body
      this.form.patchValue({...data.post});
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
    
    // Вместо того, чтобы обращаться к серверу после того, как пользователь изменил пост,
    // мы будем диспатчить action 'postUpdated' (см. ниже), 
    // поэтому обращение к postsService.savePost - удаляем
    
    // this.postsService.savePost(post.id, post)
    //   .subscribe(
    //     () => this.dialogRef.close()
    //   )

    const update: Update<IPost> = {
      id: post.id,
      changes: post
    }

    // Диспатчим action 'postUpdated', сообщая что данные поста изменились
    this.store.dispatch(postUpdated({update}));

    // Закрываем окно редактирования
    this.dialogRef.close();
  }

}
