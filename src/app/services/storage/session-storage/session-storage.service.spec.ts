import { TestBed } from '@angular/core/testing';

import { SesionStorageService } from './session-storage.service';

describe('SesionStorageService', () => {
  let service: SesionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
