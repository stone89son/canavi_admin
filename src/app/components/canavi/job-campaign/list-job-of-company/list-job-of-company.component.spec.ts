import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobOfCompanyComponent } from './list-job-of-company.component';

describe('ListJobOfCompanyComponent', () => {
  let component: ListJobOfCompanyComponent;
  let fixture: ComponentFixture<ListJobOfCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListJobOfCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJobOfCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
