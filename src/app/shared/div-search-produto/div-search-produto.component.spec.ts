import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivSearchProdutoComponent } from './div-search-produto.component';

describe('DivSearchProdutoComponent', () => {
  let component: DivSearchProdutoComponent;
  let fixture: ComponentFixture<DivSearchProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivSearchProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivSearchProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
