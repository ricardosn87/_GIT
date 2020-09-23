import { TestBed } from '@angular/core/testing';

import { GenRandomDataService } from './gen-random-data.service';

describe('GenRandomDataService', () => {
  let service: GenRandomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenRandomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
