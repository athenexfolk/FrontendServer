import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPanelComponent } from './related-panel.component';

describe('RelatedPanelComponent', () => {
  let component: RelatedPanelComponent;
  let fixture: ComponentFixture<RelatedPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedPanelComponent]
    });
    fixture = TestBed.createComponent(RelatedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
