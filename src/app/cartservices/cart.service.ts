import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../cart/cart.component'; // Adjust the path according to your project structure

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);

  cartItems$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartItems();  // Load cart items from local storage on service initialization
  }

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartItems();
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item !== product);
    this.saveCartItems();
    this.cartSubject.next(this.cartItems);
  }

  updateItemQuantity(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity = product.quantity; // Update the quantity
    }
    this.saveCartItems();
    this.cartSubject.next(this.cartItems);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCartItems();
    this.cartSubject.next(this.cartItems);
  }

  private saveCartItems(): void {
    const minimizedCartItems = this.cartItems.map(item => ({
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity
    }));
  
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(minimizedCartItems));
      } catch (e) {
        console.error("LocalStorage quota exceeded", e);
        // Optionally, handle the error here, e.g., clear older data or notify the user
      }
    }
  }
  
  loadCartItems(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedItems = localStorage.getItem('cartItems');
      if (savedItems) {
        this.cartItems = JSON.parse(savedItems);
        console.log('Loaded cart items:', this.cartItems);  // Debug log
        this.cartSubject.next(this.cartItems);
      }
    }
  }
}
