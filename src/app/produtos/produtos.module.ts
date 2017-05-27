import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosService } from './produtos.service';
import { ProdutosComponent } from './produtos.component';
import { ProdutosGridComponent } from './produtos-grid/produtos-grid.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { SmSelectComponent } from '../shared/sm-select/sm-select.component';
import { InputMoneyComponent } from '../shared/input-money/input-money.component';
import { DivMessageComponent } from '../shared/div-message/div-message.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ProdutosComponent,
    ProdutosGridComponent,
    ProdutoDetalheComponent,
    SmSelectComponent,
    InputMoneyComponent,
    DivMessageComponent,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
