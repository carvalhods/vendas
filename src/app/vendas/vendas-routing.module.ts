import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendasLancamentoComponent } from './vendas-lancamento/vendas-lancamento.component';
import { VendasHistoricoComponent } from './vendas-historico/vendas-historico.component';

const routes: Routes = [
  {
    path: 'lancamento',
    component: VendasLancamentoComponent
  },
  {
    path: 'historico',
    component: VendasHistoricoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class VendasRoutingModule { }
