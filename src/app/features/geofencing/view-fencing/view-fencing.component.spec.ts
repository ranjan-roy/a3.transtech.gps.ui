import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFencingComponent } from './view-fencing.component';

describe('ViewFencingComponent', () => {
  let component: ViewFencingComponent;
  let fixture: ComponentFixture<ViewFencingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFencingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
