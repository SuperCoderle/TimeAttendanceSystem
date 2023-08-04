import { TestBed } from '@angular/core/testing';

import { UseServiceService } from './use-service.service';

describe('UseServiceService', () => {
  let service: UseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
