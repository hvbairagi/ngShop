import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity: number;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productId) {
        this._getProduct(params.productId);
      }
    });
  }

  private _getProduct(id: string) {
    this.prodService
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => (this.product = resProduct));
  }

  addProductToCart() {}

  ngOnDestroy(): void {
    this.endSubs$.next(0);
    this.endSubs$.complete();
  }
}
