import { TestBed } from '@angular/core/testing';

import { EnvoieService } from './envoie.service';

describe('EnvoieService', () => {
  let service: EnvoieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
