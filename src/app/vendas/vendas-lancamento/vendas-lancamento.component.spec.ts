import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasLancamentoComponent } from './vendas-lancamento.component';

describe('VendasLancamentoComponent', () => {
  let component: VendasLancamentoComponent;
  let fixture: ComponentFixture<VendasLancamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendasLancamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
