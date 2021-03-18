import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from, merge, of, scheduled } from 'rxjs';
import { filter, mergeAll } from 'rxjs/operators';

export interface IConfirmDialogData {
  title: string;
  message: string;
}

export interface IConfirmDialogResult {
  isConfirmed: boolean;
}

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  data: IConfirmDialogData;

  constructor(
    private dialogRef: MatDialogRef<
      ConfirmDialogComponent,
      IConfirmDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) dialogData: IConfirmDialogData
  ) {
    merge(
      this.dialogRef
        .keydownEvents()
        .pipe(filter((e: KeyboardEvent) => e.key === 'Escape')),
      this.dialogRef.backdropClick()
    ).subscribe(() => {
      this.dialogRef.close({ isConfirmed: false });
    });

    this.data = dialogData || {
      title: 'Emin misiniz?',
      message: 'Değişiklikler iptal edilecek.',
    };
  }

  ngOnInit(): void {
    this.dialogRef.updatePosition({top: '100px'});
    this.dialogRef.disableClose = true;
  }

  cancelClick() {
    this.dialogRef.close({ isConfirmed: false });
  }
}
