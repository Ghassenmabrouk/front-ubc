import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { vipGuard } from './vip.guard';

describe('vipGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => vipGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
