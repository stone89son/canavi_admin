import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSeoComponent } from './post-seo.component';

describe('PostSeoComponent', () => {
  let component: PostSeoComponent;
  let fixture: ComponentFixture<PostSeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
