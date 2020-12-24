import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPost } from "../../model/post.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../posts.service';
import { Update } from '@ngrx/entity';

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

    private postsService: PostsService
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
    
    this.postsService.savePost(post.id, post)
      .subscribe(
        () => this.dialogRef.close()
      )

    const update: Update<IPost> = {
      id: post.id,
      changes: post
    }
  }

}
