import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipofferComponent } from './vipoffer.component';

describe('VipofferComponent', () => {
  let component: VipofferComponent;
  let fixture: ComponentFixture<VipofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VipofferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VipofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
