import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from './product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
  getProductsError(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }
  getProductsDelay(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productsdelay`);
  }

  getProductsIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/products_ids`);
  }

  getProductName(id: string): Observable<string> {
    return this.http.get(`${this.url}/products/name/${id}`, { responseType: "text" });
  }

  saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products`, p)
  }

  deleteProduct(p: Product) {
    return this.http.delete(`${this.url}/products/${p._id}`)
  }

  editProduct(p:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.url}/products/${p._id}`,p)
  }
}
