import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular/main';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosService } from './produtos.service';
import { ProdutosComponent } from './produtos.component';
import { ProdutosGridComponent } from './produtos-grid/produtos-grid.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { SmDropdownDirective } from '../shared/sm-dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ProdutosComponent,
    ProdutosGridComponent,
    ProdutoDetalheComponent,
    SmDropdownDirective,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
