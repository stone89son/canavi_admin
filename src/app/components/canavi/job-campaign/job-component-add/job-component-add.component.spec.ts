import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobComponentAddComponent } from './job-component-add.component';

describe('JobComponentAddComponent', () => {
  let component: JobComponentAddComponent;
  let fixture: ComponentFixture<JobComponentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobComponentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobComponentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
