import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurentauctionComponent } from './curentauction.component';

describe('CurentauctionComponent', () => {
  let component: CurentauctionComponent;
  let fixture: ComponentFixture<CurentauctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurentauctionComponent]
    });
    fixture = TestBed.createComponent(CurentauctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
