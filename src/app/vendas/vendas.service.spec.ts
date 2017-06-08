import { TestBed, inject } from '@angular/core/testing';

import { VendasService } from './vendas.service';

describe('VendasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendasService]
    });
  });

  it('should be created', inject([VendasService], (service: VendasService) => {
    expect(service).toBeTruthy();
  }));
});
