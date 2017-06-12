import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosService } from './produtos.service';
import { ProdutosComponent } from './produtos.component';
import { ProdutosGridComponent } from './produtos-grid/produtos-grid.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    SharedModule,
  ],
  declarations: [
    ProdutosComponent,
    ProdutosGridComponent,
    ProdutoDetalheComponent,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
