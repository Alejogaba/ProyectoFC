import { TestBed } from '@angular/core/testing';

import { CuentaDataService } from './cuenta-data.service';

describe('CuentaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaDataService = TestBed.get(CuentaDataService);
    expect(service).toBeTruthy();
  });
});
