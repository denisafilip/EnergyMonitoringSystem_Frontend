import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceApiAddComponent } from './device-api-add.component';

describe('DeviceApiAddComponent', () => {
  let component: DeviceApiAddComponent;
  let fixture: ComponentFixture<DeviceApiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceApiAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceApiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
