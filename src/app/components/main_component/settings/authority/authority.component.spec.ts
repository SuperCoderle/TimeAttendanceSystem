import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityComponent } from './authority.component';

describe('AuthorityComponent', () => {
  let component: AuthorityComponent;
  let fixture: ComponentFixture<AuthorityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorityComponent]
    });
    fixture = TestBed.createComponent(AuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
