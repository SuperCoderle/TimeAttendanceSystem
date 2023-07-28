import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationComponent } from './violation.component';

describe('ViolationComponent', () => {
  let component: ViolationComponent;
  let fixture: ComponentFixture<ViolationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViolationComponent]
    });
    fixture = TestBed.createComponent(ViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
