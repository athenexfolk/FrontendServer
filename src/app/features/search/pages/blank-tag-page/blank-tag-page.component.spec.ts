import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankTagPageComponent } from './blank-tag-page.component';

describe('BlankTagPageComponent', () => {
  let component: BlankTagPageComponent;
  let fixture: ComponentFixture<BlankTagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankTagPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankTagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
