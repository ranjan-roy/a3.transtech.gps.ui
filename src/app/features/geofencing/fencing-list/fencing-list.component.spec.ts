import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FencingListComponent } from './fencing-list.component';

describe('FencingListComponent', () => {
  let component: FencingListComponent;
  let fixture: ComponentFixture<FencingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FencingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FencingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
