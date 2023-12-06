import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRemoverComponent } from './tag-remover.component';

describe('TagRemoverComponent', () => {
  let component: TagRemoverComponent;
  let fixture: ComponentFixture<TagRemoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagRemoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
