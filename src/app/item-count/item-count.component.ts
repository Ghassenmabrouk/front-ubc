import { Component, OnInit } from '@angular/core';
import { SelectedItemsService } from '../selecteditems/selected-items.service';

@Component({
  selector: 'app-item-count',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Selected Items</h5>
        <p class="card-text">You have selected {{ itemCount }} items.</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .card-title {
      font-size: 1.5rem;
    }
    .card-text {
      font-size: 1.2rem;
    }
  `]
})
export class ItemCountComponent implements OnInit {
  itemCount: number = 0;

  constructor(private selectedItemsService: SelectedItemsService) { }

  ngOnInit(): void {
    this.updateItemCount();
  }

  updateItemCount() {
    this.itemCount = this.selectedItemsService.getItemCount();
  }
}
