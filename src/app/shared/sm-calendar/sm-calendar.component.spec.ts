import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmCalendarComponent } from './sm-calendar.component';

describe('SmCalendarComponent', () => {
  let component: SmCalendarComponent;
  let fixture: ComponentFixture<SmCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
