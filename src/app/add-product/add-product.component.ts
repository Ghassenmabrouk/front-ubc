import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Define Product interface
export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string; 
  stock: number;
  tags: string[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // Declare a separate property to handle tag input as a string
  tagInput: string = ''; 

  // Initialize the product object
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    stock: 0,
    tags: [] // Initialize as an array
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.product.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Convert tags input from a string to an array
    this.product.tags = this.tagInput.split(',').map(tag => tag.trim());

    this.http.post('http://localhost:3100/api2/products', this.product)
    .subscribe(response => {
      console.log('Product added successfully:', response);
      // Reset form or navigate away
      this.product = { name: '', description: '', price: 0, category: '', imageUrl: '', stock: 0, tags: [] };
      this.tagInput = ''; // Clear tag input
    }, error => {
      console.error('Error adding product:', error);
    });
  }
}
