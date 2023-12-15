import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTagPageComponent } from './result-tag-page.component';

describe('ResultTagPageComponent', () => {
  let component: ResultTagPageComponent;
  let fixture: ComponentFixture<ResultTagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultTagPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultTagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
