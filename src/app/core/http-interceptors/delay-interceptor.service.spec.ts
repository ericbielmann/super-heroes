import { TestBed } from '@angular/core/testing';

import { DelayInterceptorService } from './delay-interceptor.service';

describe('DelayInterceptorService', () => {
  let service: DelayInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
