import { MatDialogConfig } from '@angular/material/dialog';

export function defaultDialogConfig() {
  const dialogConfig = new MatDialogConfig();

  // true - закрытие окна происходит только при клике на close
  // false - закрытие окна происходит как при клике на close, так и при клике за пределами окна
  dialogConfig.disableClose = true;

  // true - при открытии окна происходит автофокус на первом поле
  dialogConfig.autoFocus = true;

  // Ширина окна
  dialogConfig.width = '400px';

  return dialogConfig;
}
