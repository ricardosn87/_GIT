import { TestBed } from '@angular/core/testing';

import { AuthGuardChildService } from './auth-guard-child.service';

describe('AuthGuardChildService', () => {
  let service: AuthGuardChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
