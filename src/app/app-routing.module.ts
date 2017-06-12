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
    path: 'vendas',
      loadChildren: 'app/vendas/vendas.module.ts#VendasModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
