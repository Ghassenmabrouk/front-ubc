import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../cartservices/cart.service';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  quantity?: number; // Add this optional property
  tags: string[];
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  @Input() isCartOpen: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.loadCartItems(); // Load the items from localStorage
    this.cartService.cartItems$.subscribe((items: Product[]) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  closeCart() {
    this.isCartOpen = false;
  }

  updateQuantity(item: Product): void {
    if (item.quantity && item.quantity > 0) {
      this.cartService.updateItemQuantity(item);
    }
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }

  checkout() {
    // Implement your checkout logic here
  }
}
