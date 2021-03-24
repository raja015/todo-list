import { TestBed } from '@angular/core/testing';

import { UniversalAppInterceptor as  UniversalAppInterceptorService } from './universal-app-interceptor.service';

describe('UniversalAppInterceptorService', () => {
  let service: UniversalAppInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversalAppInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
