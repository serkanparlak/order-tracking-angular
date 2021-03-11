import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin, Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productStorageKey = 'products';
  private lastIdKey = 'lastId';

  constructor(private storage: LocalStorageService) { }

  getProducts(): IProduct[] {
    return this.storage.retrieve(this.productStorageKey);
  }

  createNewId(): number {
    const lastId = this.storage.retrieve(this.lastIdKey);
    const newId = lastId + 1;
    this.storage.store(this.lastIdKey, newId);
    return newId;
  }

  addProduct(product: IProduct): IProduct {
    const products = this.getProducts();
    const newId = this.createNewId();
    const copyProduct: IProduct = { ...product, id: newId };
    this.storage.store(this.productStorageKey, products.concat(copyProduct));
    return copyProduct;
  }

  deleteProduct(productId: number): boolean {
    const products = this.getProducts();
    const index = products.findIndex(x => x.id === productId);
    if (index !== -1) {
      this.storage.store(this.productStorageKey, products.splice(index, 1));
    }
    return index !== -1;
  }

  updateProduct(id: number, product: IProduct): IProduct {
    const products = this.getProducts();
    const index = products.findIndex(x => x.id === id);
    if (index !== -1) {
      const copyProduct = { ...product, id };
      products[index] = copyProduct;
      this.storage.store(this.productStorageKey, products);
      return copyProduct;
    }
    return null;
  }
}
