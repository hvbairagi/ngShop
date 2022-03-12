import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/products';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  updateProduct(productId) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId) {
    console.log('delete');
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService
          .deleteProduct(productId)
          .pipe(takeUntil(this.endSubs$))
          .subscribe({
            next: () => {
              this._getProducts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product is deleted!',
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Product is not deleted!',
              });
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
