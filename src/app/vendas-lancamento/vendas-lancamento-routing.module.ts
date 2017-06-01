import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendasLancamentoComponent } from './vendas-lancamento.component';

const routes: Routes = [
  {
    path: '',
      component: VendasLancamentoComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class VendasLancamentoRoutingModule { }
