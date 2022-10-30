import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceApiDetailsComponent } from './device-api-details.component';

describe('DeviceApiDetailsComponent', () => {
  let component: DeviceApiDetailsComponent;
  let fixture: ComponentFixture<DeviceApiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceApiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceApiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
