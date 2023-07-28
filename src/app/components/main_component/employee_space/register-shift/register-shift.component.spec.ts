import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShiftComponent } from './register-shift.component';

describe('RegisterShiftComponent', () => {
  let component: RegisterShiftComponent;
  let fixture: ComponentFixture<RegisterShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterShiftComponent]
    });
    fixture = TestBed.createComponent(RegisterShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
