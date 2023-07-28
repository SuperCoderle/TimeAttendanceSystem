import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCalendarComponent } from './staff-calendar.component';

describe('StaffCalendarComponent', () => {
  let component: StaffCalendarComponent;
  let fixture: ComponentFixture<StaffCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffCalendarComponent]
    });
    fixture = TestBed.createComponent(StaffCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
