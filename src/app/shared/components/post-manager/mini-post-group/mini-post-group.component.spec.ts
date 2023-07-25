import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPostGroupComponent } from './mini-post-group.component';

describe('MiniPostGroupComponent', () => {
  let component: MiniPostGroupComponent;
  let fixture: ComponentFixture<MiniPostGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniPostGroupComponent]
    });
    fixture = TestBed.createComponent(MiniPostGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
