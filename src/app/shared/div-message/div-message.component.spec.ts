import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivErrorComponent } from './div-error.component';

describe('DivErrorComponent', () => {
  let component: DivErrorComponent;
  let fixture: ComponentFixture<DivErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
