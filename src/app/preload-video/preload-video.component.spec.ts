import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadVideoComponent } from './preload-video.component';

describe('PreloadVideoComponent', () => {
  let component: PreloadVideoComponent;
  let fixture: ComponentFixture<PreloadVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreloadVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreloadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
