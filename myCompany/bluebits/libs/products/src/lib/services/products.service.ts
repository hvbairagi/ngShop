import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  readonly apiURLProducts = environment.apiURL + 'products/';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.apiURLProducts + productId);
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(this.apiURLProducts + productId, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(this.apiURLProducts + productId);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(this.apiURLProducts + '/get/count')
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.apiURLProducts + '/get/featured/' + count
    );
  }
}
