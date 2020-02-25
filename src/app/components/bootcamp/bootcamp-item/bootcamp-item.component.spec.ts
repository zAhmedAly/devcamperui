import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampItemComponent } from './bootcamp-item.component';

describe('BootcampItemComponent', () => {
  let component: BootcampItemComponent;
  let fixture: ComponentFixture<BootcampItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootcampItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootcampItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
