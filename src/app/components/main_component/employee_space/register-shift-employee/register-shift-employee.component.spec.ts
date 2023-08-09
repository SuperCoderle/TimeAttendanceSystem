import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShiftEmployeeComponent } from './register-shift-employee.component';

describe('RegisterShiftEmployeeComponent', () => {
  let component: RegisterShiftEmployeeComponent;
  let fixture: ComponentFixture<RegisterShiftEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterShiftEmployeeComponent]
    });
    fixture = TestBed.createComponent(RegisterShiftEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
