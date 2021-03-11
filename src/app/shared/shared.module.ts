import { NgModule } from '@angular/core';
import AngularMaterialModule from './modules/angular-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  imports: [
    /* Angular Material */
    AngularMaterialModule,
  ],
  exports: [
    /* Angular Material */
    AngularMaterialModule,
  ],
  declarations: [ConfirmDialogComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
})
export class SharedModule { }
