import { TestBed } from '@angular/core/testing';

import { ThreatDataService } from './threat-data.service';

describe('ThreatDataService', () => {
  let service: ThreatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
