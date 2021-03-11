import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product.model';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openProductAddDialog(product?: IProduct) {
    this.dialog
      .open(ProductAddDialogComponent, {
        data: product,
        disableClose: true
      })
      .afterClosed()
      .subscribe((res) => {
        // alert(res.data);
      });
  }
}
