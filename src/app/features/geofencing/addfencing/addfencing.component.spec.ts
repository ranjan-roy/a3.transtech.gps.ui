import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfencingComponent } from './addfencing.component';

describe('AddfencingComponent', () => {
  let component: AddfencingComponent;
  let fixture: ComponentFixture<AddfencingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfencingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
