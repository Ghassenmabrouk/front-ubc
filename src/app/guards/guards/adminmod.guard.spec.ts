import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminmodGuard } from './adminmod.guard';

describe('adminmodGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminmodGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
