import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSkeletonComponent } from './image-skeleton.component';

describe('ImageSkeletonComponent', () => {
  let component: ImageSkeletonComponent;
  let fixture: ComponentFixture<ImageSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSkeletonComponent]
    });
    fixture = TestBed.createComponent(ImageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
