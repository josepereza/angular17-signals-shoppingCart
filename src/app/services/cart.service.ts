import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { IProduct, ShoppingCart } from '../interfaces/iproduct';


@Injectable({
  providedIn: 'root',
})
export class CartService {
   subTotal:number=0;
   //Total: WritableSignal<number> = signal(0);

  cart:WritableSignal<ShoppingCart> = signal<ShoppingCart>({
    items: [],
    totalAmount: 0,
  });
  TotalAmount:Signal<number> = computed(() => this.cart().items.reduce((total, item) => total + item.price * item.quantity!, 0) );
   
   calculateTotalAmount(items: IProduct[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity!, 0);
  } 
  addItem(item: IProduct) {
   
     this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find(
        (i) => i.id === item.id
      );

      if (existingItem) {
        // Increment quantity if item already exists
        existingItem.quantity! ++ ;
      } else {
        // Add the new item if it doesn't exist
        item.quantity=1;
        currentCart.items.push(item);
      }
      
      this.subTotal = item.price * item.quantity!;
      currentCart.totalAmount=this.calculateTotalAmount(currentCart.items);  
      return currentCart;
    }); 


    /* item.quantity=1;
    this.cart.update((currentCart) => {
      currentCart.items.push(item);
      currentCart.totalAmount=this.TotalAmount();
      currentCart
      return currentCart
    }) */
  }

   removeItem(productId:number) {
    this.cart.update((currentCart) => {
      const item = currentCart.items.find((i) => i.id === productId);

      if (item) {
        currentCart.totalAmount -= item.price * item.quantity!;
        currentCart.items = currentCart.items.filter(
          (i) => i.id !== productId
        );
      }

      return currentCart;
    });
  } 
}