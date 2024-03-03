import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public products = toSignal<IProduct[]>(this.http.get<IProduct[]>('https://fakestoreapi.com/products'));
  public products$ = toObservable(this.products);
  constructor(private http: HttpClient) {

  }
}

