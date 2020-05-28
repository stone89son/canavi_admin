import { TestBed } from '@angular/core/testing';

import { ManageJobService } from './manage-job.service';

describe('ManageJobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageJobService = TestBed.get(ManageJobService);
    expect(service).toBeTruthy();
  });
});
