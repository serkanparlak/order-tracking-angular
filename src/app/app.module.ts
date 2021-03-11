import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { ProductAddDialogComponent } from './components/product-add-dialog/product-add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';

/* register locale tr */
registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    ProductsComponent,
    ProductTileComponent,
    CartComponent,
    CartProductComponent,
    ProductAddDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    /* Shared Module */
    SharedModule,
    NgxWebstorageModule.forRoot({prefix: 'orduevi', separator: '-'})
  ],
  providers: [
    /* use locale tr */
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
