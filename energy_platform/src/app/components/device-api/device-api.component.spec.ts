import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceApiComponent } from './device-api.component';

describe('DeviceApiComponent', () => {
  let component: DeviceApiComponent;
  let fixture: ComponentFixture<DeviceApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
