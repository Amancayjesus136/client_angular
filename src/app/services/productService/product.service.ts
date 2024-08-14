import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/productModel/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/products/${id}`);
  }

  createProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/products`, data);
  }

  updateProduct(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/products/${id}`);
  }
}
