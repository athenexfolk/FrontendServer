import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyPostComponent } from './lazy-post.component';

describe('LazyPostComponent', () => {
  let component: LazyPostComponent;
  let fixture: ComponentFixture<LazyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
