import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypointComponent } from './mypoint.component';

describe('MypointComponent', () => {
  let component: MypointComponent;
  let fixture: ComponentFixture<MypointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MypointComponent]
    });
    fixture = TestBed.createComponent(MypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
