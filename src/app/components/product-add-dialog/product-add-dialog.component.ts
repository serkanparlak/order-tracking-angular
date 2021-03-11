import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {
  ConfirmDialogComponent,
  IConfirmDialogResult,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

interface IProductAddDialogResult {
  operation?: 'add' | 'update';
  isSuccess: boolean;
  product: IProduct
}

@Component({
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.scss'],
})
export class ProductAddDialogComponent implements OnInit {
  productForm: FormGroup;
  product?: IProduct;

  constructor(
    private dialog: MatDialog,
    private productAddDialog: MatDialogRef<ProductAddDialogComponent, IProductAddDialogResult>,
    @Inject(MAT_DIALOG_DATA) dialogData: IProduct,
    private productService: ProductService,
  ) {
    merge(
      this.productAddDialog
        .keydownEvents()
        .pipe(filter((e: KeyboardEvent) => e.key === 'Escape')),
      this.productAddDialog.backdropClick()
    ).subscribe(() => this.closeIfNotAnyChanges());

    this.product = dialogData;
  }

  ngOnInit(): void {
    this.initProductForm();
  }

  get getProductFormControls(): { [key in keyof IProduct]: FormControl } {
    return this.productForm.controls as any;
  }

  closeIfNotAnyChanges() {
    if (this.productForm.dirty) {
      this.dialog
        .open(ConfirmDialogComponent)
        .afterClosed()
        .subscribe((res: IConfirmDialogResult) => {
          res.isConfirmed && this.productAddDialog.close();
        });
    } else {
      this.productAddDialog.close();
    }
  }

  initProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product?.name),
      amount: new FormControl(this.product?.amount),
      price: new FormControl(this.product?.price),
    } as { [key in keyof IProduct]: FormControl });
  }

  formSubmit() {
    if (this.productForm.invalid)
      return false;
    const formData = this.productForm.value;
    if (this.product?.id) {
      // update product
      const product = this.productService.updateProduct(this.product.id, formData);
      this.productAddDialog.close({ isSuccess: true, product });
    } else {
      // add product
      const product = this.productService.addProduct(formData);
      this.productAddDialog.close({ isSuccess: true, product });
    }
  }
}
