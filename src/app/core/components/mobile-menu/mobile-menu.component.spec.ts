import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuButtonComponent } from './mobile-menu.component';

describe('MobileMenuButtonComponent', () => {
  let component: MobileMenuButtonComponent;
  let fixture: ComponentFixture<MobileMenuButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileMenuButtonComponent]
    });
    fixture = TestBed.createComponent(MobileMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
