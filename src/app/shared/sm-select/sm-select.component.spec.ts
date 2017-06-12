import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmSelectComponent } from './sm-select.component';

describe('SmSelectComponent', () => {
  let component: SmSelectComponent;
  let fixture: ComponentFixture<SmSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
