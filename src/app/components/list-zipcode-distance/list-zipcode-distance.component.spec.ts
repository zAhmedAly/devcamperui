import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListZipcodeDistanceComponent } from './list-zipcode-distance.component';

describe('ListZipcodeDistanceComponent', () => {
  let component: ListZipcodeDistanceComponent;
  let fixture: ComponentFixture<ListZipcodeDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListZipcodeDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListZipcodeDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
