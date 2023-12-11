import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileSettingsPageComponent } from './my-profile-settings-page.component';

describe('MyProfileSettingsPageComponent', () => {
  let component: MyProfileSettingsPageComponent;
  let fixture: ComponentFixture<MyProfileSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileSettingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyProfileSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
