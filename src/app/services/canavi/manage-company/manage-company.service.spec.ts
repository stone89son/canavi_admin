import { TestBed } from '@angular/core/testing';

import { ManageCompanyService } from './manage-company.service';

describe('ManageCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageCompanyService = TestBed.get(ManageCompanyService);
    expect(service).toBeTruthy();
  });
});
