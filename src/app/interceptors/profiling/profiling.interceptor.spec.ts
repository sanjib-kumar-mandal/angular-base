import { TestBed } from '@angular/core/testing';

import { ProfilingInterceptor } from './profiling.interceptor';

describe('ProfilingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProfilingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProfilingInterceptor = TestBed.inject(ProfilingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
