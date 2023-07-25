import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSkeletonComponent } from './text-skeleton.component';

describe('TextSkeletonComponent', () => {
  let component: TextSkeletonComponent;
  let fixture: ComponentFixture<TextSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextSkeletonComponent]
    });
    fixture = TestBed.createComponent(TextSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
