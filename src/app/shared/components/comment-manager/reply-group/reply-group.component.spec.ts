import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyGroupComponent } from './reply-group.component';

describe('ReplyGroupComponent', () => {
  let component: ReplyGroupComponent;
  let fixture: ComponentFixture<ReplyGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyGroupComponent]
    });
    fixture = TestBed.createComponent(ReplyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
