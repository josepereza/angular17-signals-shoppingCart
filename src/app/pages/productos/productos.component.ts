import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [JsonPipe, CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
api=inject(ApiService)
carrito=inject(CartService)
addToCart(producto:any){
  this.carrito.addItem(producto)
}
}
