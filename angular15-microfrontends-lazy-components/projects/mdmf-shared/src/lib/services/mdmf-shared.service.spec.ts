import { TestBed } from '@angular/core/testing';

import { MdmfSharedService } from './mdmf-shared.service';

describe('MdmfSharedService', () => {
  let service: MdmfSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdmfSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
