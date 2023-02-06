import { TestBed } from '@angular/core/testing';

import { InformationPersonnelleService } from './information-personnelle.service';

describe('InformationPersonnelleService', () => {
  let service: InformationPersonnelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationPersonnelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
