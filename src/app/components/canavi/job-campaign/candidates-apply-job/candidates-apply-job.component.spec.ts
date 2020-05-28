import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesApplyJobComponent } from './candidates-apply-job.component';

describe('CandidatesApplyJobComponent', () => {
  let component: CandidatesApplyJobComponent;
  let fixture: ComponentFixture<CandidatesApplyJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatesApplyJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesApplyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
