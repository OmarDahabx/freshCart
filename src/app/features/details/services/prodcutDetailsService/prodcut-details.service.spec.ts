import { TestBed } from '@angular/core/testing';

import { ProdcutDetailsService } from './prodcut-details.service';

describe('ProdcutDetailsService', () => {
  let service: ProdcutDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdcutDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
