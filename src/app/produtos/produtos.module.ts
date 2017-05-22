import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosService } from './produtos.service';
import { ProdutosComponent } from './produtos.component';
import { ProdutosGridComponent } from './produtos-grid/produtos-grid.component';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { SmDropdownDirective } from '../shared/sm-dropdown.directive';
import { InputMoneyComponent } from '../shared/input-money/input-money.component';

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
    SmDropdownDirective,
    InputMoneyComponent,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
