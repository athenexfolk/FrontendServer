import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOwnerComponent } from './post-owner.component';

describe('PostOwnerComponent', () => {
  let component: PostOwnerComponent;
  let fixture: ComponentFixture<PostOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostOwnerComponent]
    });
    fixture = TestBed.createComponent(PostOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
