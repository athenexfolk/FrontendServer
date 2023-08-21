import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLineSkeletonComponent } from './single-line-skeleton.component';

describe('SingleLineSkeletonComponent', () => {
  let component: SingleLineSkeletonComponent;
  let fixture: ComponentFixture<SingleLineSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleLineSkeletonComponent]
    });
    fixture = TestBed.createComponent(SingleLineSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
