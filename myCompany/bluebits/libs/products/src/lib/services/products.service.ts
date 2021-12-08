import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '@bluebits/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  readonly apiURLCategories = environment.apiURL + 'products/';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLCategories);
  }

  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(this.apiURLCategories + categoryId);
  // }

  // createCategory(category: Category): Observable<Category> {
  //   return this.http.post<Category>(this.apiURLCategories, category);
  // }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(
  //     this.apiURLCategories + category.id,
  //     category
  //   );
  // }

  // deleteCategory(categoryId: string): Observable<any> {
  //   return this.http.delete<any>(this.apiURLCategories + categoryId);
  // }
}
