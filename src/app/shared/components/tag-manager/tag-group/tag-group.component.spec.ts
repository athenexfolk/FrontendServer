import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagGroupComponent } from './tag-group.component';

describe('TagGroupComponent', () => {
  let component: TagGroupComponent;
  let fixture: ComponentFixture<TagGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagGroupComponent]
    });
    fixture = TestBed.createComponent(TagGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
