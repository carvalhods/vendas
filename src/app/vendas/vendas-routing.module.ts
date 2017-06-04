import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendasLancamentoComponent } from './vendas-lancamento/vendas-lancamento.component';

const routes: Routes = [
  {
    path: 'lancamento',
      component: VendasLancamentoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class VendasRoutingModule { }
