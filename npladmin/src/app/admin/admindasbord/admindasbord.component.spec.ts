import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindasbordComponent } from './admindasbord.component';

describe('AdmindasbordComponent', () => {
  let component: AdmindasbordComponent;
  let fixture: ComponentFixture<AdmindasbordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmindasbordComponent]
    });
    fixture = TestBed.createComponent(AdmindasbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
