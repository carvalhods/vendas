import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasLancamentoRoutingModule } from './vendas-lancamento-routing.module';
import { VendasLancamentoComponent } from './vendas-lancamento.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VendasLancamentoRoutingModule,
    SharedModule
  ],
  declarations: [
    VendasLancamentoComponent
  ]
})
export class VendasLancamentoModule { }
