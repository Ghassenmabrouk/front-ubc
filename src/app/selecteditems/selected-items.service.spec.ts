import { TestBed } from '@angular/core/testing';

import { SelectedItemsService } from './selected-items.service';

describe('SelectedItemsService', () => {
  let service: SelectedItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
