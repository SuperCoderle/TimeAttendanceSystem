import { TestBed } from '@angular/core/testing';

import { TimelogService } from './timelog.service';

describe('TimelogService', () => {
  let service: TimelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
