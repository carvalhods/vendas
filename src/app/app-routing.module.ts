import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
      component: AppComponent
  },
  {
    path: 'produtos',
      loadChildren: 'app/produtos/produtos.module.ts#ProdutosModule',
  },
  {
    path: 'vendas_lanc',
      loadChildren: 'app/vendas-lancamento/vendas-lancamento.module.ts#VendasLancamentoModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
