import { TestBed } from '@angular/core/testing';

import { LoadDataApiService } from './load-data-api.service';

describe('LoadDataApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadDataApiService = TestBed.get(LoadDataApiService);
    expect(service).toBeTruthy();
  });
});
