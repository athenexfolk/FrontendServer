import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRunnerComponent } from './code-runner.component';

describe('CodeRunnerComponent', () => {
  let component: CodeRunnerComponent;
  let fixture: ComponentFixture<CodeRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeRunnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
