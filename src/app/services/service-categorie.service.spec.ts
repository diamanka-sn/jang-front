import { TestBed } from '@angular/core/testing';

import { ServiceCategorieService } from './service-categorie.service';

describe('ServiceCategorieService', () => {
  let service: ServiceCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
