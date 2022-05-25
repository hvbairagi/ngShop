import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage = false;

  endSubs$: Subject<any> = new Subject();
  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryId
        ? this._getProducts([params.categoryId])
        : this._getProducts();
      params.categoryId
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => (this.products = products));
  }

  private _getCategories() {
    this.catService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => (this.categories = categories));
  }

  categoryFilter() {
    if (this.categories) {
      const selectedCategories = this.categories
        .filter((c) => c.checked === true)
        .map((c) => c.id);

      this._getProducts(selectedCategories as string[]);
    }
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }
}
