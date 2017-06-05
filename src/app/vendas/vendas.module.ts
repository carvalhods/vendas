import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VendasRoutingModule } from './vendas-routing.module';
import { VendasLancamentoComponent } from './vendas-lancamento/vendas-lancamento.component';
import { SharedModule } from '../shared/shared.module';
import { ProdutosService } from '../produtos/produtos.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VendasRoutingModule,
    SharedModule
  ],
  declarations: [
    VendasLancamentoComponent
  ],
  providers: [
    ProdutosService,
  ]
})
export class VendasModule { }
