import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePositionComponent } from './vehicle-position.component';

describe('VehiclePositionComponent', () => {
  let component: VehiclePositionComponent;
  let fixture: ComponentFixture<VehiclePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
