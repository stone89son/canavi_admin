import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusRecruiterDialogComponent } from './status-recruiter-dialog.component';

describe('StatusRecruiterDialogComponent', () => {
  let component: StatusRecruiterDialogComponent;
  let fixture: ComponentFixture<StatusRecruiterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusRecruiterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusRecruiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
