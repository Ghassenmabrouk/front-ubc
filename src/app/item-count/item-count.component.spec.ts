import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCountComponent } from './item-count.component';

describe('ItemCountComponent', () => {
  let component: ItemCountComponent;
  let fixture: ComponentFixture<ItemCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
