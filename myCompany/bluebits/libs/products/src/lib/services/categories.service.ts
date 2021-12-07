import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/api/v1/categories/';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }
}
