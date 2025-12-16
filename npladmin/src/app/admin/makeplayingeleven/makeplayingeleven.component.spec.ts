import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeplayingelevenComponent } from './makeplayingeleven.component';

describe('MakeplayingelevenComponent', () => {
  let component: MakeplayingelevenComponent;
  let fixture: ComponentFixture<MakeplayingelevenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeplayingelevenComponent]
    });
    fixture = TestBed.createComponent(MakeplayingelevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
