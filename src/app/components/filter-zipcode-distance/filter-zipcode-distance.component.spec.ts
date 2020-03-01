import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterZipcodeDistanceComponent } from './filter-zipcode-distance.component';

describe('FilterZipcodeDistanceComponent', () => {
  let component: FilterZipcodeDistanceComponent;
  let fixture: ComponentFixture<FilterZipcodeDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterZipcodeDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterZipcodeDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
