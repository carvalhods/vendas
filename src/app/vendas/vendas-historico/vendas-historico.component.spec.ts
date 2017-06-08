import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasHistoricoComponent } from './vendas-historico.component';

describe('VendasHistoricoComponent', () => {
  let component: VendasHistoricoComponent;
  let fixture: ComponentFixture<VendasHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendasHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
