import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientApiComponent } from './client-api.component';

describe('ClientApiComponent', () => {
  let component: ClientApiComponent;
  let fixture: ComponentFixture<ClientApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
