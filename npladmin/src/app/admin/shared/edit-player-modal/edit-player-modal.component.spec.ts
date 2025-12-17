import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerModalComponent } from './edit-player-modal.component';

describe('EditPlayerModalComponent', () => {
  let component: EditPlayerModalComponent;
  let fixture: ComponentFixture<EditPlayerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlayerModalComponent]
    });
    fixture = TestBed.createComponent(EditPlayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
