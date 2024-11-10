import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../model/product";

const PATH_JSON = '/assets/product.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  get products(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(PATH_JSON);
  }

}
