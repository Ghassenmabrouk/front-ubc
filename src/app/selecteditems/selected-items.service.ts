import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemsService {
  private selectedItems: any[] = [];

  constructor() { }

  addItem(item: any) {
    this.selectedItems.push(item);
  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(i => i !== item);
  }

  getItems() {
    return this.selectedItems;
  }

  getItemCount() {
    return this.selectedItems.length;
  }

  clearItems() {
    this.selectedItems = [];
  }
}
