import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobForAddComponent } from './job-for-add.component';

describe('JobForAddComponent', () => {
  let component: JobForAddComponent;
  let fixture: ComponentFixture<JobForAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobForAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobForAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
