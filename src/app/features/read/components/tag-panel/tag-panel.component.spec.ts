import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPanelComponent } from './tag-panel.component';

describe('TagPanelComponent', () => {
  let component: TagPanelComponent;
  let fixture: ComponentFixture<TagPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagPanelComponent]
    });
    fixture = TestBed.createComponent(TagPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
