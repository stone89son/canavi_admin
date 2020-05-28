import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCampaignComponent } from './job-campaign.component';

describe('JobCampaignComponent', () => {
  let component: JobCampaignComponent;
  let fixture: ComponentFixture<JobCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
