import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFactoryComponent } from './tag-factory.component';

describe('TagFactoryComponent', () => {
  let component: TagFactoryComponent;
  let fixture: ComponentFixture<TagFactoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagFactoryComponent]
    });
    fixture = TestBed.createComponent(TagFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
